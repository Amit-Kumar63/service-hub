import React from 'react'
import AddressSuggestion from './AddressSuggestion'

const EditProfile = ({setUpdateProfilePanel, updateProfileRef, isEdit, setIsEdit, setEditedProfileData, updateProfileHandler, editedProfileData, address, setAddress}) => {
  return (
    <>
    <section ref={updateProfileRef} className="fixed translate-y-full h-fit bottom-0 z-10 mt-auto w-full bg-white">
        <div className="pb-5 px-2 border-t border-b border-gray-200 border-solid">
        <h1 onClick={() => setUpdateProfilePanel(false)} className='text-center text-gray-300 pt-1'><i className="text-4xl ri-subtract-line"></i></h1>        
          <button 
          onClick={() => setIsEdit(!isEdit)}
          className={`bg-gray-200 font-bold ${isEdit ? 'text-red-500' : 'text-gray-700'} text-sm py-1 px-3 rounded-lg mb-3 float-right`}>
            {isEdit ? "Cancel" : "Edit"}
          </button>
          <input 
          className={`w-full px-4 py-3 mb-5 text-wrap text-lg bg-[#E8EEF2] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${isEdit ? 'text-gray-700' : 'text-gray-400'} ${isEdit ? 'focus:ring-blue-500' : 'focus:ring-transparent'}`}
          type="text" 
          placeholder="Name"
          required
          value={editedProfileData.name}
          readOnly={!isEdit}
          onChange={(e) => setEditedProfileData({...editedProfileData, name: e.target.value})}
          />
          <input 
          required
          className={`w-full px-4 py-3 mb-5 text-wrap text-lg bg-[#E8EEF2] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${isEdit ? 'text-gray-700' : 'text-gray-400'} ${isEdit ? 'focus:ring-blue-500' : 'focus:ring-transparent'}`}
          type="number" 
          placeholder="Phone"
          value={editedProfileData.phone}
          readOnly={!isEdit}
          onChange={(e) => setEditedProfileData({...editedProfileData, phone: e.target.value})}
          />
          <AddressSuggestion address={address} setAddress={setAddress} readOnly={!isEdit}/>
          <button 
          disabled={!isEdit}
          className={`w-full ${isEdit ? 'bg-blue-500' : 'bg-gray-400'} font-bold text-white py-3 px-4 rounded-lg mb-3`}
          onClick={updateProfileHandler}
          >
            Confirm changes
          </button>
          <button className="w-full bg-gray-400 font-bold text-white py-3 px-4 rounded-lg mb-2">Cancel</button>
        </div>
      </section>
    </>
  )
}

export default EditProfile