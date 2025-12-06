import React, { useEffect, useState } from 'react';
import { list } from '../../datasource/api-event';
import ListItemEvent from './ListItemEvent.jsx';
import { Link } from 'react-router-dom';

const ListEvent = () => {
    const [eventsList, setEventList] = useState([]);
    let [isLoading, setIsLoading] = useState(true);

    const loadEvent = () => {
        list().then((data) => {
            console.log('API Response:', data);
            if (data) {
                // Handle different response formats
                if (Array.isArray(data)) {
                    setEventList(data);
                } else if (data.data && Array.isArray(data.data)) {
                    setEventList(data.data);
                } else if (data.events && Array.isArray(data.events)) {
                    setEventList(data.events);
                } else {
                    setEventList([]);
                }
                setIsLoading(false);
            }
        }).catch(err => {
            console.error('Error loading events:', err);
            setEventList([]);
            setIsLoading(false);
            alert(err.message || 'Failed to load events');
        });
    }

    // When the component loads.
    useEffect(() => {
        loadEvent();
    }, []);

    // When a item is removed.
    const handleRemove = () => {
        loadEvent();
    }

    return (
        <>
            <div className="container" style={{ paddingTop: 10 }}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>Event List</h2>
                    <Link to="/events/add" className="btn btn-primary" role="button">
                        <i className="fas fa-plus-circle"></i> Create an Event
                    </Link>
                </div>
                <div className="table-responsive">
                    {isLoading && <div className="alert alert-info">Loading events...</div>}
                    {!isLoading && eventsList.length === 0 && (
                        <div className="alert alert-warning">No events found. Create your first event!</div>
                    )}
                    {!isLoading && eventsList.length > 0 &&
                        <table className="table table-bordered table-striped table-hover">
                            <thead>
                                <tr>
                                    <th className="text-center">Name</th>
                                    <th className="text-center">Date & Time</th>
                                    <th className="text-center">Priority</th>
                                    <th className="text-center">Location</th>
                                    <th className="text-center">Description</th>
                                    <th className="text-center" colSpan="2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {eventsList.map(event =>
                                    <ListItemEvent
                                        key={event._id || event.id}
                                        event={event}
                                        onRemoved={handleRemove}
                                    />
                                )}
                            </tbody>
                        </table>}
                </div>
            </div>
        </>
    )
}

export default ListEvent;