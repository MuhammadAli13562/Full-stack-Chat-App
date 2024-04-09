import { useState } from "react"
import ChatSelectorContainer from "./chat-selector/ChatSelector.Container"
import AddContact from "./contact/AddContact.SideBar"
import AddContactToggle from "./contact/AddContact.Toggle"
import SignOutButton from "./SignOutButton"
import ProfileToggle from "./profile/Profile.Toggle"
import Profile from "./profile/Profile.SideBar"

const SideBar = () => {
  const [toggleAddContact, setToggleAddContact] = useState(false)
  const [toggleProfile, setToggleProfile] = useState(false)

  return (
    <div className="relative ">
      <div className=" flex flex-col gap-12 h-full border-secondary-600 border-[1px] border-r-0  w-[30vw] min-w-[440px] xl:w-[26vw] bg-b-dark ">
        <div className="h-[60px] p-4 flex-between  bg-secondary-500 w-full border-r-[2px] border-gray-800 ">
          <ProfileToggle toggle={() => setToggleProfile(true)} />
          <div className="flex gap-2">
            <AddContactToggle toggle={() => setToggleAddContact(true)} />
            <SignOutButton />
          </div>
        </div>
        <ChatSelectorContainer />
      </div>
      <AddContact
        toggle={() => setToggleAddContact(false)}
        visibility={toggleAddContact}
      />
      <Profile
        toggle={() => setToggleProfile(false)}
        visibility={toggleProfile}
      />
    </div>
  )
}

export default SideBar
