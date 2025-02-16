import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Drawer, TextField, Button, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const PASSWORD = "yourpassword";

const TableHeader = styled(TableHead)({
    backgroundColor: "#f5f5f5",
});

const MOCK_LOCATIONS = [
    {
        _id: "67b1ce289d01b04a0cf702c5",
        size: 15,
        sizeUnit: "sqft",
        target: 50000,
        raisedAmount: 0,
        targetCurrency: "USD",
        details: "Some new text",
        coordinates: { x: 40.7128, y: 74.006 },
        imagesUrl: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
        deleted: false
    },
    {
        _id: "67b1ce289d01b04a0cf702b3",
        size: 300,
        sizeUnit: "sqft",
        target: 1000000,
        raisedAmount: 55555,
        targetCurrency: "USD",
        details: "The new lookout",
        coordinates: { x: 30, y: 55 },
        imagesUrl: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
        deleted: false
    },
    {
        _id: "67b1cbb289d21b04a0cf702b3",
        size: 273,
        sizeUnit: "sqft",
        target: 33500,
        raisedAmount: 23400,
        targetCurrency: "USD",
        details: "the new youth center",
        coordinates: { x: 20, y: 91 },
        imagesUrl: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
        deleted: false
    }
];

const EMPTY_LOCATION = {
    _id: null,
    size: "",
    sizeUnit: "sqft",
    target: "",
    raisedAmount: 0,
    targetCurrency: "USD",
    details: "",
    coordinates: { x: "", y: "" },
    imagesUrl: [],
    deleted: false
};

const ProtectedPage = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [error, setError] = useState("");
    const [locations, setLocations] = useState(MOCK_LOCATIONS);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [isNew, setIsNew] = useState(false);

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
        alert(`Mock update for location: ${selectedLocation._id}`);
    };

    const handleCreateLocation = async () => {
        alert(`Mock create location: ${JSON.stringify(selectedLocation, null, 2)}`);
        setLocations([...locations, { ...selectedLocation, _id: `new-${Date.now()}` }]);
        setSelectedLocation(null);
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
