import { Button } from "src/components/ui/button"

const AddContactToggle = ({ toggle }: { toggle: () => void }) => {
  return (
    <Button onClick={toggle} className=" shadcn-btn">
      Add Contact
    </Button>
  )
}

export default AddContactToggle
