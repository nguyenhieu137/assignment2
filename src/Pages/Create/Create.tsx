import React from 'react'
import './create.scss'
import Sidebar from '../../Components/Sidebar/Sidebar'

function Create() {
  return (
    <div className='create-container'>
        <Sidebar></Sidebar>
        <div className="create-section">
            <div className="create-title">
                Create Task Page
            </div>

            <div className="create-form">
                <div className="field">
                    <span>Name</span>
                    <input type="text" className='ip-title'/>
                </div>
                <div className="field">
                    <span>Description</span>
                    <textarea name="" id="" className='ip-des'></textarea>
                </div>
                <div className="field">
                    <span>Deadline</span>
                    <input type="date" />
                </div>
                <div className="field">
                    <span>Choose Category</span>
                    <select name="" id="" className='ip-category'>
                        <option value="work">Work</option>
                        <option value="housewoks">Houseworks</option>
                        <option value="personal">Personal</option>
                        <option value="freelance">Freelance</option>
                        <option value="else">Else</option>   
                    </select>
                </div>
            </div>

            <div className="create-action__btn">
                <button className='create-btn'>Create</button>
            </div>
        </div>
    </div>
  )
}

export default Create