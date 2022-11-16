import React, { useState } from "react"
import { Modal } from "../../context/Modal"
import UserNewReview from "./UserNewReview"

export default function UserNewReviewModal(){
    const [ showModal, setShowModal ] = useState(false)


    return (
        <>
        <button onClick={()=>setShowModal(true)}>Post New Review</button>
        {showModal && (
            <Modal onClose={()=>setShowModal(false)}>
                <UserNewReview />
            </Modal>
        )}
        </>
    )

}
