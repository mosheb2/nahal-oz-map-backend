import { useState, useEffect } from 'react';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Card,
    CardContent,
    Typography,
    IconButton, MenuItem
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import axios from 'axios'

const API_URL = `${import.meta.env.VITE_API_URL || 'https://api.standwithnahaloz.com'}/api/locations`;

const LocationManagement = () => {
    const categories = ['youth', 'agriculture', 'community','education', 'other'];

    const [properties, setLocations] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        details: '',
        categoryName: '',
        coverImagesUrl: '',
        coordinates: { x: 0, y: 0 },
        target: 1000000,
        raisedAmount: 0,
        donorsCount: 0,
        projPageLinkUrl: '',
        donatePageLinkUrl: '',
    });

    useEffect(() => {
        // Simulated API call to fetch properties
        const fetchLocations = async () => {
            try {
               const res=  await axios.get(API_URL)
                const locations = res?.data?.locations || [];

                setLocations(locations);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchLocations();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('coordinates.')) {
            const coordKey = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                coordinates: {
                    ...prev.coordinates,
                    [coordKey]: value
                }
            }));

            return;
        }

        if(name.startsWith('image')) {
            setFormData(prev => ({
                ...prev,
                imageUrl: value
            }));

            return;
        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            if (currentLocation) {
                await axios.put(`${API_URL}/${currentLocation._id}`, formData)

                setLocations(prev =>
                    prev.map(p => p === currentLocation ? { ...formData } : p)
                );
            } else {
                await axios.post(API_URL, formData)
                setLocations(prev => [...prev, formData]);
            }
            setIsDialogOpen(false);
            resetForm();
        } catch (error) {
            console.error('Error saving property:', error);
        }
    };

    const handleDelete = async (property) => {
        try {
            await axios.delete(`${API_URL}/${property._id}`)
            setLocations(prev => prev.filter(p => p !== property));
        } catch (error) {
            console.error('Error deleting property:', error);
        }
    };

    const handleEdit = (property) => {
        setCurrentLocation(property);
        setFormData(property);
        setIsDialogOpen(true);
    };

    const resetForm = () => {
        setCurrentLocation(null);
        setFormData({
            title: '',
            details: '',
            categoryName: '',
            coverImagesUrl: '',
            coordinates: { x: 50, y: 50 },
            target: 1000000,
            raisedAmount: 0,
            donorsCount: 0,
            projPageLinkUrl: '',
            donatePageLinkUrl: '',
        });
    };

    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <Typography variant="h4">Location Management</Typography>
                <Button variant="contained" color="primary" onClick={() => {
                    resetForm();
                    setIsDialogOpen(true);
                }}>
                    Add New Location
                </Button>
            </div>

            <Card>
                <CardContent>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                            <tr style={{backgroundColor: '#f5f5f5'}}>
                                <th style={{padding: '1rem', textAlign: 'left'}}>Title</th>
                                <th style={{padding: '1rem', textAlign: 'left'}}>Details</th>
                                <th style={{padding: '1rem', textAlign: 'left'}}>Category Name</th>
                                <th style={{padding: '1rem', textAlign: 'left'}}>Img</th>
                                <th style={{padding: '1rem', textAlign: 'left'}}>Map Location</th>
                                <th style={{padding: '1rem', textAlign: 'left'}}>Raised Amount</th>
                                <th style={{padding: '1rem', textAlign: 'left'}}>Donors Count</th>
                                <th style={{padding: '1rem', textAlign: 'left'}}>Project Page URL</th>
                                <th style={{padding: '1rem', textAlign: 'left'}}>Donation Page URL</th>
                                <th style={{padding: '1rem', textAlign: 'left'}}>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {properties.map((property, index) => (
                                <tr key={index} style={{borderTop: '1px solid #e0e0e0'}}>
                                    <td style={{padding: '1rem'}}>{property.title}</td>
                                    <td style={{
                                        padding: '1rem',
                                        maxWidth: '200px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        {property.details}
                                    </td>
                                    <td style={{padding: '1rem'}}>{property.categoryName}</td>
                                    <td style={{padding: '1rem'}}>{property.coverImagesUrl || 'Missing'}</td>
                                    <td style={{padding: '1rem'}}>{`(${property.coordinates.x}%, ${property.coordinates.y}%)`}</td>
                                    <td style={{padding: '1rem'}}>${property.raisedAmount} / ${property.target} </td>
                                    <td style={{padding: '1rem'}}>{property.donorsCount}</td>
                                    <td style={{padding: '1rem'}}>{property.projPageLinkUrl}</td>
                                    <td style={{padding: '1rem'}}>{property.donatePageLinkUrl}</td>

                                    <td style={{padding: '1rem'}}>
                                        <IconButton color="primary" onClick={() => handleEdit(property)}>
                                            <EditIcon/>
                                        </IconButton>
                                        <IconButton color="error" onClick={() => handleDelete(property)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {currentLocation ? 'Edit Property' : 'Add New Property'}
                </DialogTitle>
                <DialogContent>
                    <div style={{ display: 'grid', gap: '1rem', paddingTop: '1rem' }}>
                        <TextField
                            name="title"
                            label="Title"
                            fullWidth
                            value={formData.title}
                            onChange={handleInputChange}
                        />
                        <TextField
                            name="details"
                            label="Details"
                            multiline
                            rows={4}
                            fullWidth
                            value={formData.details}
                            onChange={handleInputChange}
                        />
                        <TextField
                            select
                            name="categoryName"
                            label="Category Name"
                            fullWidth
                            value={formData.categoryName}
                            onChange={handleInputChange}
                        >
                            {categories.map((category) => (
                                <MenuItem key={category} value={category}>
                                    {category}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            name="coverImagesUrl"
                            label="Cover Image url"
                            fullWidth
                            value={formData.coverImagesUrl}
                            onChange={handleInputChange}
                        />
                        <TextField
                            name="coordinates.x"
                            label="Latitude"
                            fullWidth
                            value={formData.coordinates.x}
                            onChange={handleInputChange}
                        />
                        <TextField
                            name="coordinates.y"
                            label="Longitude"
                            fullWidth
                            value={formData.coordinates.y}
                            onChange={handleInputChange}
                        />
                        <TextField
                            name="raisedAmount"
                            label="Raised Amount"
                            type="number"
                            fullWidth
                            value={formData.raisedAmount}
                            onChange={handleInputChange}
                        />

                        <TextField
                            name="target"
                            label="Target Price"
                            type="number"
                            fullWidth
                            value={formData.target}
                            onChange={handleInputChange}
                        />
                        <TextField
                            name="donorsCount"
                            label="Donors Count"
                            type="number"
                            fullWidth
                            value={formData.donorsCount}
                            onChange={handleInputChange}
                        />
                        <TextField
                            name="projPageLinkUrl"
                            label="Project Page URL"
                            fullWidth
                            value={formData.projPageLinkUrl}
                            onChange={handleInputChange}
                        />
                        <TextField
                            name="donatePageLinkUrl"
                            label="Donate Page URL"
                            fullWidth
                            value={formData.donatePageLinkUrl}
                            onChange={handleInputChange}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        {currentLocation ? 'Update' : 'Create'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default LocationManagement;