import React, { useEffect, useState } from 'react';
import { list } from '../../datasource/api-event';
import ListItemEvent from './ListItemEvent.jsx';
import { Link } from 'react-router-dom';

const ListEvent = () => {
    const [eventsList, setEventList] = useState([]);
    let [isLoading, setIsLoading] = useState(true);

    const loadEvent = () => {
        list().then((data) => {
            if (data) {
                setEventList(data || []);

                setIsLoading(false);
            }
        }).catch(err => {
            alert(err.message);
            console.log(err);
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
            <div>
                <Link to="/events/add" className="btn btn-primary align-self-end" role="button">
                    <i className="fas fa-plus-circle"></i>
                    Add a new Event
                </Link>
            </div>
            <div className="table-responsive" >
                {isLoading && <div>Loading...</div>}
                {!isLoading &&
                    <table className="table table-bordered table-striped table-hover">
                        <thead>
                            {/* -- Header Row-- */}
                            <tr>
                                <th className="text-center">Name</th>
                                <th className="text-center">Date</th>
                                <th className="text-center">Time</th>
                                <th className="text-center">Location</th>
                                <th className="text-center">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* -- Repeatable Template Row -- */}
                            {eventsList.map(event =>
                                <ListItemEvent
                                    key={event.id}
                                    project={event}
                                    onRemoved={handleRemove}
                                />
                            )}
                        </tbody>
                    </table>}
            </div>
        </>
    )
}

export default ListEvent;