import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateUserDialog } from "@/features/users/components/CreateUserDialog";
import { CreateCourseDialog } from "@/features/courses/components/CreateCourseDialog";
import { EnrollmentFormDialog } from "@/features/enrollments/components/EnrollmentFormDialog";

export function QuickActions() {
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [isCreateCourseOpen, setIsCreateCourseOpen] = useState(false);
  const [isCreateEnrollmentOpen, setIsCreateEnrollmentOpen] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
      <Button 
        className="w-full sm:w-auto bg-text-primary text-bg-primary hover:bg-text-primary/90"
        onClick={() => setIsCreateUserOpen(true)}
      >
        <Plus className="size-4 mr-2" />
        Create User
      </Button>
      <Button 
        variant="ghost" 
        className="w-full sm:w-auto shadow-border"
        onClick={() => setIsCreateCourseOpen(true)}
      >
        <Plus className="size-4 mr-2" />
        Create Course
      </Button>
      <Button 
        variant="ghost" 
        className="w-full sm:w-auto shadow-border"
        onClick={() => setIsCreateEnrollmentOpen(true)}
      >
        <Plus className="size-4 mr-2" />
        Create Enrollment
      </Button>

      <CreateUserDialog 
        isOpen={isCreateUserOpen} 
        onClose={() => setIsCreateUserOpen(false)} 
      />

      <CreateCourseDialog
        isOpen={isCreateCourseOpen}
        onClose={() => setIsCreateCourseOpen(false)}
        mode="create"
      />

      <EnrollmentFormDialog
        isOpen={isCreateEnrollmentOpen}
        onClose={() => setIsCreateEnrollmentOpen(false)}
        mode="create"
      />
    </div>
  );
}
