import React from "react"
import { Button } from "src/components/ui/button"

const ProfileToggle = ({ toggle }: { toggle: () => void }) => {
  return (
    <Button onClick={toggle} className=" shadcn-btn">
      Profile
    </Button>
  )
}

export default ProfileToggle
