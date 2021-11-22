// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GetFromBackend from "../hooks/getFromBackend";
import { db } from "../firebase-config";
import { setDoc, doc, deleteDoc } from "@firebase/firestore";
import '../Styles/_activity.scss';

const EditView: React.FC = () => {
    let { id } = useParams()
    const { docs } = GetFromBackend("activities");
    const [activity, setActivity] = useState(null)
    const [name, setName] = useState(null)
    const [topic, setTopic] = useState(null)
    const [location, setLocation] = useState(null)
    const [date, setDate] = useState(null)
    const [description, setDesc] = useState(null)
    
    const handleEdit = async () => {
        const docRef = doc(db, "activities", id);
        const payload = { topic, location, date, description, name }
        setDoc(docRef, payload);
    }
    const handleCancel = async () => {
        const docRef = doc(db, "activities", id)
        await deleteDoc(docRef);
        console.log(docRef, 'this is docref')
    }

    useEffect(() => {
        const obj = [...docs].find((obj) => { return obj.id === id })
        setActivity(obj)
        if (activity) {
            setName(activity.name)
            setTopic(activity.topic)
            setLocation(activity.location)
            setDesc(activity.description)
            setDate(activity.date)
        }
    }, [activity, docs, id])

    return (
        <React.Fragment >
            {activity ? (
                <div className="newActivityDiv" >
                    <section>
                        <h2>Edit activity, {activity.name}</h2>
                    </section>
                    <article className="greenArt">
                        <h4>Name:</h4>
                        <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <h4>Date:</h4>
                        <input 
                            type="text" 
                            value={date}
                            onChange={(e) => setDate(e.target.value)} 
                        />
                        <h4>Location:</h4>
                        <input 
                            type="text" 
                            value={location}
                            onChange={(e) => setLocation(e.target.value)} 
                        />
                        <h4>Topic:</h4>
                        <input 
                            type="text" 
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)} 
                        />
                        <h4>Description:</h4>
                        <input 
                            type="text"
                            value={description}
                            onChange={(e) => setDesc(e.target.value)}  
                        />

                        <section className="buttonSection">
                            <button className="cancelBtn" onClick={handleCancel}>Cancel activity</button>
                            <button className="editBtn">Stop editing</button>
                            <button className="editBtn" onClick={handleEdit}>Save activity</button>
                        </section>
                    </article>
                </div>
            ) : null}
        </React.Fragment>
    );
}
export default EditView;