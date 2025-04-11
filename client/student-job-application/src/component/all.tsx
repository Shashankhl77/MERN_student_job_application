import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  Pagination,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import axios from 'axios';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import banner from './banner.jpeg'
import AddApplicationModal from './add'
export enum ApplicationStatus {
  APPLIED = 'APPLIED',
  REJECTED = 'REJECTED',
  OFFER = 'OFFER',
  INTERVIEW = 'INTERVIEW',
}

interface Application {
  _id: string;
  company: string;
  role: string;
  status: ApplicationStatus;
  link?: string;
  dateOfApplication: string;
}

const statusColors: Record<ApplicationStatus, string> = {
  APPLIED: '#2196f3',
  REJECTED: '#f44336',
  OFFER: '#4caf50',
  INTERVIEW: '#ff9800',
};

const GetAllApplications: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [filters, setFilters] = useState({
    company: '',
    role: '',
    status: '',
    search: '',
  });
  const [page, setPage] = useState(1);
  const limit = 6;

  const [open, setOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const fetchApplications = async () => {
    try {
      const res = await axios.get('http://localhost:7008/application/getAll', {
        params: { ...filters, page, limit },
      });
      setApplications(res.data.data || []);
      setTotalCount(res.data.totalCount || 0);
    } catch (err) {
      console.error('Error fetching applications:', err);
    }
  };

  const handleUpdate = (app: Application) => {
    setSelectedApp(app);
    setOpen(true);
  };

  const handleSubmitUpdate = async () => {
    if (!selectedApp) return;
    try {
      await axios.put(
        `http://localhost:7008/application/update/${selectedApp._id}`,
        selectedApp
      );
      setOpen(false);
      fetchApplications();
    } catch (error) {
      console.error('Error updating application:', error);
    }
  };

  const handleDelete = async (appToDelete: Application) => {
    try {
      await axios.delete(`http://localhost:7008/application/delete/${appToDelete._id}`);
      setOpen(false);
      fetchApplications();
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [filters, page]);

  const handleInputChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name as string]: value as string }));
  };

  const statusCounts = Object.values(ApplicationStatus).map((status) => ({
    name: status,
    value: applications.filter((a) => a.status === status).length,
  }));

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        {/* Circle Graph */}
        <Grid item xs={12} lg={4}>
          <Box
            sx={{
              width: '100%',
              height: 350,
              backgroundColor: '#f0f4f8',
              borderRadius: 4,
              p: 2,
              boxShadow: 1,
            }}
          >
            <Typography variant="h6" gutterBottom align="center">
              Application Status Summary
            </Typography>
            <Box
  sx={{
    position: 'relative',
    height: 300,
    borderRadius: 2,
    overflow: 'hidden',
  }}
>
  {/* Background image with opacity */}
  <Box
    sx={{
      position: 'absolute',
      inset: 0,
      backgroundImage: `url(${banner})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      opacity: 0.3, // Adjust this for transparency
      zIndex: 1,
    }}
  />

  {/* Chart content on top */}
  <Box sx={{ position: 'relative', zIndex: 2, height: '100%' }}>
    <ResponsiveContainer width="100%" height="100%" >
      <PieChart>
        <Pie
          data={statusCounts}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius="50%"
          outerRadius="80%"
          paddingAngle={5}
          label
          
        >
          {statusCounts.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={statusColors[entry.name as ApplicationStatus]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </Box>
</Box>

          </Box>
        </Grid>
        {/* Filters and Application List */}
        <Grid item xs={12} lg={8}>
          <Box mb={4}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Applications ({totalCount})
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <TextField
                  label="Company"
                  name="company"
                  value={filters.company}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  label="Role"
                  name="role"
                  value={filters.role}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <Select
                  displayEmpty
                  fullWidth
                  name="status"
                  value={filters.status}
                  onChange={handleInputChange}
                >
                  <MenuItem value="">All Status</MenuItem>
                  {Object.values(ApplicationStatus).map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  label="Search"
                  name="search"
                  value={filters.search}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, search: e.target.value }))
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button variant="contained" fullWidth onClick={fetchApplications}>
                  Apply filter
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Grid container spacing={3}>
            {applications.map((app) => (
              <Grid item key={app._id} xs={12} sm={6}>
                <Card>
                  <CardContent>
                    <Chip
                      label={app.status}
                      sx={{
                        backgroundColor: statusColors[app.status],
                        color: 'white',
                        mt: 1,
                      }}
                    />
                    <Typography variant="h6" fontWeight="bold">
                      {app.company}
                    </Typography>
                    <Typography>Role: {app.role}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Link: {app.link || 'N/A'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Date: {app.dateOfApplication}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => handleUpdate(app)}>
                      Update
                    </Button>
                    <Button size="small" color="error" onClick={() => handleDelete(app)}>
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={Math.ceil(totalCount / limit)}
              page={page}
              onChange={(_, value) => setPage(value)}
              color="primary"
            />
          </Box>
        </Grid>
      </Grid>

      {/* Update Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Update Application</DialogTitle>
        <DialogContent>
          <TextField
            label="Company"
            fullWidth
            margin="normal"
            value={selectedApp?.company || ''}
            onChange={(e) =>
              setSelectedApp((prev) => ({ ...prev!, company: e.target.value }))
            }
          />
          <TextField
            label="Role"
            fullWidth
            margin="normal"
            value={selectedApp?.role || ''}
            onChange={(e) =>
              setSelectedApp((prev) => ({ ...prev!, role: e.target.value }))
            }
          />
          <TextField
            label="Link"
            fullWidth
            margin="normal"
            value={selectedApp?.link || ''}
            onChange={(e) =>
              setSelectedApp((prev) => ({ ...prev!, link: e.target.value }))
            }
          />
          <Select
            fullWidth
            value={selectedApp?.status || ''}
            onChange={(e) =>
              setSelectedApp((prev) => ({
                ...prev!,
                status: e.target.value as ApplicationStatus,
              }))
            }
            sx={{ mt: 2 }}
          >
            {Object.values(ApplicationStatus).map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmitUpdate}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default GetAllApplications;
