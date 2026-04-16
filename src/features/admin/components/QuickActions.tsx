import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateUserDialog } from "@/features/users/components/CreateUserDialog";

export function QuickActions() {
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
      <Button 
        className="w-full sm:w-auto bg-text-primary text-bg-primary hover:bg-text-primary/90"
        onClick={() => setIsCreateUserOpen(true)}
      >
        <Plus className="size-4 mr-2" />
        Create User
      </Button>
      <Button variant="ghost" className="w-full sm:w-auto shadow-border">
        <Plus className="size-4 mr-2" />
        Create Course
      </Button>
      <Button variant="ghost" className="w-full sm:w-auto shadow-border">
        <Plus className="size-4 mr-2" />
        Create Enrollment
      </Button>

      <CreateUserDialog 
        isOpen={isCreateUserOpen} 
        onClose={() => setIsCreateUserOpen(false)} 
      />
    </div>
  );
}
