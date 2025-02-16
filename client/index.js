import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Drawer, TextField, Button, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";

const PASSWORD = "yourpassword";

const TableHeader = styled(TableHead)({
    backgroundColor: "#f5f5f5",
});

const EMPTY_LOCATION = {
    _id: null,
    title: "",
    details: "",
    size: "",
    sizeUnit: "sqft",
    target: "",
    raisedAmount: 0,
    targetCurrency: "USD",
    coordinates: { x: "", y: "" },
    imagesUrl: [],
    deleted: false
};

const ProtectedPage = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [error, setError] = useState("");
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [isNew, setIsNew] = useState(false);

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        try {
            const response = await axios.get("/api/locations");
            setLocations(response.data);
        } catch (err) {
            console.error("Error fetching locations:", err);
        }
    };

    const handlePasswordSubmit = () => {
        if (passwordInput === PASSWORD) {
            setError("");
            setAuthenticated(true);
        } else {
            setError("Incorrect password, please try again.");
        }
    };

    const handleRowClick = (location) => {
        setSelectedLocation(location);
        setIsNew(false);
    };

    const handleInputChange = (key, value) => {
        setSelectedLocation((prev) => ({
            ...prev,
            [key]: key === "imagesUrl" ? value.split("\n") : value
        }));
    };

    const handleCoordinateChange = (axis, value) => {
        setSelectedLocation((prev) => ({
            ...prev,
            coordinates: {
                ...prev.coordinates,
                [axis]: value
            }
        }));
    };

    const handleUpdateLocation = async () => {
        try {
            await axios.put(`/api/locations/${selectedLocation._id}`, selectedLocation);
            fetchLocations();
            setSelectedLocation(null);
        } catch (err) {
            console.error("Error updating location:", err);
        }
    };

    const handleCreateLocation = async () => {
        try {
            const response = await axios.post("/api/locations", selectedLocation);
            setLocations([...locations, response.data]);
            setSelectedLocation(null);
        } catch (err) {
            console.error("Error creating location:", err);
        }
    };

    const handleAddLocation = () => {
        setSelectedLocation(EMPTY_LOCATION);
        setIsNew(true);
    };

    if (!authenticated) {
        return (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <Typography variant="h5">Enter Password</Typography>
                <Box display="flex" flexDirection="column" alignItems="center" gap={2} marginTop={2}>
                    <TextField
                        type="password"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        error={Boolean(error)}
                        helperText={error}
                        style={{ width: "200px" }}
                    />
                    <Button variant="contained" onClick={handlePasswordSubmit} style={{ width: "200px" }}>
                        Submit
                    </Button>
                </Box>
            </div>
        );
    }

    return (
        <div style={{ padding: "20px" }}>
            <Typography variant="h4" gutterBottom>Location Management</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell><b>Name</b></TableCell>
                            <TableCell><b>Raised</b></TableCell>
                            <TableCell><b>Target</b></TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {locations.map((location) => (
                            <TableRow 
                                key={location._id} 
                                onClick={() => handleRowClick(location)} 
                                style={{ cursor: "pointer" }}
                                hover
                            >
                                <TableCell>{location.title}</TableCell>
                                <TableCell>{location.details}</TableCell>
                                <TableCell>{location.raisedAmount} {location.targetCurrency}</TableCell>
                                <TableCell>{location.target} {location.targetCurrency}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box display="flex" justifyContent="center" marginTop={2}>
                <Button variant="contained" color="primary" onClick={handleAddLocation}>
                    Add Location
                </Button>
            </Box>

            <Drawer anchor="right" open={Boolean(selectedLocation)} onClose={() => setSelectedLocation(null)}>
                {selectedLocation && (
                    <div style={{ width: "450px", padding: "20px" }}>
                        <Typography variant="h6">{isNew ? "Create New Location" : "Edit Location"}</Typography>
                        <TextField
                            label="Title"
                            fullWidth
                            multiline
                            value={selectedLocation.title}
                            onChange={(e) => handleInputChange("title", e.target.value)}
                            margin="normal"
                        />
                        <TextField
                            label="Details"
                            fullWidth
                            multiline
                            value={selectedLocation.details}
                            onChange={(e) => handleInputChange("details", e.target.value)}
                            margin="normal"
                        />
                        <TextField
                            label="Size"
                            fullWidth
                            type="number"
                            value={selectedLocation.size}
                            onChange={(e) => handleInputChange("size", e.target.value)}
                            margin="normal"
                        />
                        <TextField
                            label="Size Unit"
                            fullWidth
                            value={selectedLocation.sizeUnit}
                            onChange={(e) => handleInputChange("sizeUnit", e.target.value)}
                            margin="normal"
                        />
                        <TextField
                            label="Target"
                            fullWidth
                            type="number"
                            value={selectedLocation.target}
                            onChange={(e) => handleInputChange("target", e.target.value)}
                            margin="normal"
                        />
                        <TextField
                            label="Raised Amount"
                            fullWidth
                            type="number"
                            value={selectedLocation.raisedAmount}
                            onChange={(e) => handleInputChange("raisedAmount", e.target.value)}
                            margin="normal"
                        />
                        <TextField
                            label="Target Currency"
                            fullWidth
                            value={selectedLocation.targetCurrency}
                            onChange={(e) => handleInputChange("targetCurrency", e.target.value)}
                            margin="normal"
                        />
                        <TextField
                            label="Coordinate X"
                            fullWidth
                            value={selectedLocation.coordinates.x}
                            onChange={(e) => handleCoordinateChange("x", e.target.value)}
                            margin="normal"
                        />
                        <TextField
                            label="Coordinate Y"
                            fullWidth
                            value={selectedLocation.coordinates.y}
                            onChange={(e) => handleCoordinateChange("y", e.target.value)}
                            margin="normal"
                        />
                        <TextField
                            label="Images URLs (one per line)"
                            fullWidth
                            multiline
                            value={selectedLocation.imagesUrl.join("\n")}
                            onChange={(e) => handleInputChange("imagesUrl", e.target.value)}
                            margin="normal"
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={isNew ? handleCreateLocation : handleUpdateLocation}
                            style={{ marginTop: "10px" }}
                        >
                            {isNew ? "Create Location" : "Update Location"}
                        </Button>
                    </div>
                )}
            </Drawer>
        </div>
    );
};

export default ProtectedPage;
