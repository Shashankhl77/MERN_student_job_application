import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Snackbar,
  Alert,
  Box,
  MenuItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

const AddApplicationModal = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    company: '',
    role: '',
    status: '',
    link: '',
    dateOfApplication: ''
  });
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setForm({ company: '', role: '', status: '', link: '', dateOfApplication: '' });
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:7008/application/create', form);
      setSnackbar({
        open: true,
        message: res.data.message,
        severity: 'success',
      });
      handleClose();
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error?.response?.data?.message || 'Something went wrong!',
        severity: 'error',
      });
    }
  };

  return (
    <>
    <Box position="absolute" right={100} top={100} display="flex" justifyContent="flex-end"  width={200} height={68}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleOpen}
        sx={{ mb: 2 }}
      >
        Add application
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add New Application</DialogTitle>
        <DialogContent>
          <TextField
            label="Company"
            name="company"
            value={form.company}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Role"
            name="role"
            value={form.role}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
<TextField
  select
  label="Status"
  name="status"
  value={form.status}
  onChange={handleChange}
  fullWidth
  margin="normal"
  required
>
  <MenuItem value="APPLIED">Applied</MenuItem>
  <MenuItem value="INTERVIEW">Interview</MenuItem>
  <MenuItem value="OFFER">Offer</MenuItem>
  <MenuItem value="REJECTED">Rejected</MenuItem>
</TextField>
          <TextField
            label="dateOfApplication"
            name="dateOfApplication"
            value={form.dateOfApplication}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Link"
            name="link"
            value={form.link}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="success">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      </Box>
    </>
  );
};

export default AddApplicationModal;
