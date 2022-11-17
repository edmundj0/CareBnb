import React, { useState } from "react"
import { Modal } from "../../context/Modal"
import UserNewReview from "./UserNewReview"
import './UserNewReview.css'

export default function UserNewReviewModal(){
    const [ showModal, setShowModal ] = useState(false)


    return (
        <>
        <button className="post-new-review-button" onClick={()=>setShowModal(true)}>Post New Review</button>
        {showModal && (
            <Modal onClose={()=>setShowModal(false)}>
                <UserNewReview />
            </Modal>
        )}
        </>
    )

}
