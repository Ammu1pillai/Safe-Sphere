async function fetchIncidents() {
    try {
        const response = await fetch('http://localhost:3000/api/incidents'); // Adjust the API URL
        const incidents = await response.json();

        const incidentsList = document.getElementById('incidents-list');
        incidentsList.innerHTML = '';

        incidents.forEach(incident => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${incident.location}</strong>: ${incident.description} (Status: ${incident.status})`;
            incidentsList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching incidents:', error);
    }
}

window.onload = fetchIncidents;

