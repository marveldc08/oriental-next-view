'use client'
import React, { useCallback, useEffect, useState } from 'react';
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
// import 'bootstrap/dist/css/bootstrap.min.css';
// @ts-ignore: side-effect import without type declarations
import 'font-awesome/css/font-awesome.min.css';
import Header from "../../../../components/Header";
import { useLocalStorageObject } from "../../../../hooks/useLocalStorage";
import { useSearchParams } from 'next/navigation';
import router from 'next/router';
import { toast } from 'react-toastify';
import TimeAgo from '../../../../components/TimeAgo';


const ActivityInformation = () => {

      const searchParams = useSearchParams();
      const taskId = searchParams.get("id");
      const parsedTaskId = taskId ? JSON.parse(taskId) : null;
  
      const [loading, setLoading] = useState(false);
      type User = {
        id: number;
        firstName: string;
        lastName: string;
        emailAddress: string;
        // add other properties as needed
      };
      const [user, setUser] = useLocalStorageObject<User | null>("user", null);
      const [users, setUsers] = useState<User[]>([]);
      const [token, setToken] = useLocalStorageObject("token", null);
      const [userName, setUserName] = useState("");
      const [fetchedTask, setFetchedTask] = useState({} as any);
      type TaskUser = {
        id: number;
        user: User;
        task: { name: string };
        userCategory: { name: string };
      };
      const [taskUsers, setTaskUsers] = useState<TaskUser[]>([])
      type UserCategory = { id: number; name: string };
      const [taskUsersCategories, setTaskUsersCategories] = useState<UserCategory[]>([])
      const [fetchedTaskMilestones, setFetchedTaskMilestones] = useState<any[]>([])
      type MilestoneStatus = { id: number; name: string };
      const [milestoneStatuses, setMilestoneStatuses] = useState<MilestoneStatus[]>([])


      const [showUpdateModal, setShowUpdateModal] = useState(false);
      const [showCreateMilestoneModal, setShowCreateMilestoneModal] = useState(false);
      const [showAddMultipleUserModal, setShowAddMultipleUserModal] = useState(false);
      const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
      const [showDeleteMilestoneModal, setShowDeleteMilestoneModal] = useState(false);
      const [showMilestoneDetailsModal, setShowMilestoneDetailsModal] = useState(false);
      const [showUpdateMilestoneModal, setShowUpdateMilestoneModal] = useState(false);
      const [selectedMilestoneId, setSelectedMilestoneId] = useState(null);
      const [selectedMilestoneName, setSelectedMilestoneName] = useState("");
      const [selectedMilestone, setSelectedMilestone] = useState<any>(null);

      const [name, setName] = useState("");
      const [description, setDescription] = useState("");
      const [startDate, setStartDate] = useState("");
      const [endDate, setEndDate] = useState("");
      const [expectedEndDate, setExpectedEndDate] = useState("");
      const [formulae, setFormulae] = useState("");
      const [formulaeSummary, setFormulaeSummary] = useState("");
      const [milestoneSubject, setMilestoneSubject] = useState("")
      const [selectedMilestoneSubjects, setSelectedMilestoneSubjects] = useState<{subject: string}[]>([]);
      const [milestoneToBeDeleted, setMilestoneToBeDeleted] = useState(null)
      const [milestoneStatusId, setMilestoneStatusId] = useState<number | null>(null)


      const [removalReason, setRemovalReason] = useState("");
      const [userToBeRemoved, setUserToBeRemoved] = useState<TaskUser | null>(null)

      const [showAddCommentModal, setShowAddCommentModal] = useState(false);
      const [showUpdateCommentModal, setShowUpdateCommentModal] = useState(false);
      const [commentIdToBeUpdated, setCommentIdToBeUpdated] = useState<number | null>(null);
      const [comments, setComments] = useState("");
      const [taskComments, setTaskComments] = useState<any[]>([])

      const [selectedUser, setSelectedUser] = useState<User | null>(null);
      type SelectedUser = {
        userId: number;
        userFirstName: string;
        userLastName: string;
        userEmail: string;
        categoryId: number;
        categoryName: string;
      };
      const [selectedUsers, setSelectedUsers] = useState<SelectedUser[]>([]);
      const [selectedCategory, setSelectedCategory] = useState<UserCategory | null>(null);
      const [showAssignUserModal, setShowAssignUserModal] = useState(false);


      useEffect(() => {
        if (user) {
          setUserName(`${user.firstName} ${user.lastName}`);
        } else {
          console.log("No user data found.");
        }
      }, [user]);
      

      const getUsers = useCallback(async () => {
        try {
          const response = await fetch('/api/users/get-users',{
            method: "GET",
            headers:{
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
    
          if (!response.ok) {
            console.log(`Error fetching users: ${response.status} ${response.text()}`);
            throw new Error("Failed to fetch users");
          }
    
          const data = await response.json();
          return data;
        } catch (error) {
          console.log("Error fetching users:", error);
        }
      }, [token]);

      const getUsersCategories = useCallback(async () => {
        try {
          const response = await fetch("/api/periods/tasks/users-categories", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "authorization": `Bearer ${token}`,
            },
          });
    
          if (!response.ok) {
            console.log(`Error fetching categories: ${response.status} ${response.text()}`);
            throw new Error("Failed to fetch categories");
          }
    
          const data = await response.json();
    
          return data;
        } catch (error) {
          console.error("Error fetching categories:", error);
          throw error; // Re-throw the error to handle it in the calling function
        }
      }, [token]);

      const getTaskMilestoneStatuses = useCallback(async () => {
        try {
          const response = await fetch(`/api/periods/tasks/milestone/get-milestone-statuses`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "authorization": `Bearer ${token}`,
            },
          });
    
          if (!response.ok) {
            console.log(`Error fetching milestone statuses: ${response.status} ${response.text()}`);
            throw new Error("Failed to milestone statuses");
          }
    
          const data = await response.json();
    
          return data;
        } catch (error) {
          console.error("Error fetching milestone statuses:", error);
         
          if (error instanceof Error) {
            console.error("Error fetching milestone statuses:", error.message, error.stack);
          } else {
            console.error("Error fetching milestone statuses: Unknown error", error);
          }
          throw error; // Re-throw the error to handle it in the calling function
    
        }
      }, [ token]);

      const getTask = useCallback(async () => {
        try {
          const response = await fetch(`/api/periods/tasks/get-period-task/${parsedTaskId}?id=${parsedTaskId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "authorization": `Bearer ${token}`,
            },
          });
    
          if (!response.ok) {
            console.log(`Error fetching task: ${response.status} ${response.text()}`);
            throw new Error("Failed to fetch task");
          }
    
          const data = await response.json();
    
          return data;
        } catch (error) {
            console.error("Error fetching task:", error);
            if (error instanceof Error) {
              console.error("Error fetching task:", error.message, error.stack);
            } else {
              console.error("Error fetching task: Unknown error", error);
            }
            throw error; // Re-throw the error to handle it in the calling function
      
          }
      }, [parsedTaskId, token]);

      const getTaskUsers = useCallback(async () => {
        try {
          const response = await fetch(`/api/periods/tasks/get-task-users?id=${parsedTaskId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "authorization": `Bearer ${token}`,
            },
          });
    
          if (!response.ok) {
            console.log(`Error fetching task users: ${response.status} ${response.text()}`);
            throw new Error("Failed to fetch task users");
          }
    
          const data = await response.json();
    
          return data;
        } catch (error) {
          console.error("Error fetching task users:", error);
          if (error instanceof Error) {
            console.error("Error fetching task users:", error.message, error.stack);
          } else {
            console.error("Error fetching task users: Unknown error", error);
          }
          throw error; // Re-throw the error to handle it in the calling function

        }
      }, [parsedTaskId, token]);

      const getTaskComments = useCallback(async () => {
        try {
          const response = await fetch(`/api/periods/tasks/comments/get-comments?id=${parsedTaskId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "authorization": `Bearer ${token}`,
            },
          });
    
          if (!response.ok) {
            console.log(`Error fetching task commments: ${response.status} ${response.text()}`);
            throw new Error("Failed to fetch task comments");
          }
    
          const data = await response.json();
    
          return data;
        } catch (error) {
          console.error("Error fetching task comments:", error);
          if (error instanceof Error) {
            console.error("Error fetching task comments:", error.message, error.stack);
          } else {
            console.error("Error fetching task comments: Unknown error", error);
          }
          throw error; // Re-throw the error to handle it in the calling function

        }
      }, [parsedTaskId, token]);

      const getTaskMilestones = useCallback(async () => {
        try {
          const response = await fetch(`/api/periods/tasks/milestone/get-milestones?id=${parsedTaskId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "authorization": `Bearer ${token}`,
            },
          });
    
          if (!response.ok) {
            console.log(`Error fetching task: ${response.status} ${response.text()}`);
            throw new Error("Failed to fetch task");
          }
    
          const data = await response.json();
    
          return data;
        } catch (error) {
          console.error("Error fetching task:", error);
          if (error instanceof Error) {
            console.error("Error fetching task:", error.message, error.stack);
          } else {
            console.error("Error fetching task: Unknown error", error);
          }
          throw error; // Re-throw the error to handle it in the calling function

        }
      }, [parsedTaskId, token]);


      useEffect(() => {
        if (!token) {
          console.log("No token found, redirecting to login.");
          router.push("/login");
          return;
        }

        const fetchUsers = async () => {
          const usersData = await getUsers();
          if (usersData) {
            setUsers(usersData.data);
          }
        };
        const fetchTaskUsersCategories = async () => {
          try {
            const taskUsersCategoriesData = await getUsersCategories();
          
            setTaskUsersCategories(taskUsersCategoriesData.data);

          } catch (error) {
            console.error("Error fetching task users categories:", error);
            toast.error("Failed to fetch task users categories");
          }
        };
        
        const fetchTask = async () => {
          try {
            const taskData = await getTask();
            console.log("TASK DATA", taskData.data)
            setFetchedTask(taskData.data);

          } catch (error) {
            console.error("Error fetching task:", error);
            toast.error("Failed to fetch task");
          }
        };
        const fetchTaskUsers = async () => {
          try {
            const taskUsersData = await getTaskUsers();
        
            setTaskUsers(taskUsersData.data);
            

          } catch (error) {
            console.error("Error fetching task users:", error);
            toast.error("Failed to fetch task users");
          }
        };
        const fetchTaskComments = async () => {
          try {
            const taskCommentsData = await getTaskComments();    
            setTaskComments(taskCommentsData.data);
          } catch (error) {
            console.error("Error fetching task comments:", error);
            toast.error("Failed to fetch task comments");
          }
        };

        const fetchTaskMilestones = async () => {
          try {
            const taskMilestonesData = await getTaskMilestones();
       
            setFetchedTaskMilestones(taskMilestonesData.data);

          } catch (error) {
            console.error("Error fetching task:", error);
            toast.error("Failed to fetch task");
          }
        };

        const fetchMilestoneStatuses = async () => {
          try {
            const milestoneStatusesData = await getTaskMilestoneStatuses();
       
            setMilestoneStatuses(milestoneStatusesData.data);

          } catch (error) {
            console.error("Error fetching task:", error);
            toast.error("Failed to fetch task");
          }
        };

        fetchUsers();
        fetchTaskUsersCategories();
        fetchTask();
        fetchTaskUsers()
        fetchTaskMilestones()
        fetchMilestoneStatuses()
        fetchTaskComments()
        

      }, [token, getUsers, getTask, getTaskUsers,getUsersCategories,getTaskMilestones,getTaskMilestoneStatuses,getTaskComments, loading]);

    

      const handleUpdateTask = async (name: string, description: string, formulae: string, formulaeSummary: string, startDate: string, expectedEndDate: string) => {
        setLoading(true);
        try {
          const response = await fetch(`/api/periods/tasks/update-period-task/${parsedTaskId}?id=${parsedTaskId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
              name,
              description,
              formulae,
              formulaeSummary,
              startDate,
              expectedEndDate
            }),
          });
  
          if (!response.ok) {
            console.error(`Error updating task: ${response.status} ${response.statusText}`);
            throw new Error("Failed to update task");
          }
  
          const data = await response.json();
          toast.success("Task updated successfully");
          setShowUpdateModal(false);
          setLoading(false);
         
        } catch (error) {
          console.error("Error updating task:", error);
          toast.error("Failed to update task");
          setLoading(false);
        }
      }

    const handleCancelTask = async () => {
      setLoading(true);
     
      try {
        const response = await fetch(`/api/periods/tasks/cancel-period-task/${parsedTaskId}?id=${parsedTaskId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`,
          }
        });

        if (!response.ok) {
          console.error(`Error cancelling task: ${response.status} ${response.statusText}`);
          throw new Error("Failed to cancel task");
        }

        const data = await response.json();
        toast.success("Task cancelled successfully");
        setLoading(false);
       
      } catch (error) {
        console.error("Error cancelling task:", error);
        toast.error("Failed to cancel task");
        setLoading(false);
      }
    }

    const handleUserChange = (e: React.ChangeEvent<HTMLElement>) => {
      const selectedUserName = (e.target as HTMLSelectElement).value;
      const selectedUser = users.find(user => user.firstName === selectedUserName) || null;
      setSelectedUser(selectedUser);
    };
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedCategoryName = e.target.value;
      const selectedCategory = taskUsersCategories.find(category => category.name === selectedCategoryName);
      if (selectedCategory) {
        setSelectedCategory(selectedCategory);
      } else {
        setSelectedCategory(null);
      }
    };
    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedStatusId = e.target.value;
      const pasrsedSelectedStatusId = parseInt(selectedStatusId)
       console.log("Selected Status Id",pasrsedSelectedStatusId)
      const selectedMilestoneStatusId = milestoneStatuses.find(status => status.id === pasrsedSelectedStatusId);
      if (selectedMilestoneStatusId) {
        setMilestoneStatusId(selectedMilestoneStatusId.id);
      } else {
        setMilestoneStatusId(null);
      }
    };

    const handleCompileSelectedUsers = () => {
      if (selectedUser && selectedCategory) {
        const alreadyAdded = selectedUsers.some(u => u.userId === selectedUser.id);
        if (alreadyAdded) {
          toast.info("User already added");
          return;
        }

        const newUser = {
          userId: selectedUser.id,
          userFirstName: selectedUser.firstName,
          userLastName: selectedUser.lastName,
          userEmail: selectedUser.emailAddress,
          categoryId: selectedCategory.id,
          categoryName: selectedCategory.name,
        };

        setSelectedUsers(prev => [...prev, newUser]);
      } else {
        toast.error("Please select both a user and a category");
      }
    };

    const handleAssignUser = async (userId: number, userCategoryId: number) => {
      if (!selectedUser || !selectedCategory) {
        toast.error("Please select a user and a category");
        return;
      }
      setLoading(true);
      const singleUrl = `/api/periods/tasks/assign-user?id=${parsedTaskId}`;
      const multiUrl = `/api/periods/tasks/assign-user/bulk?id=${parsedTaskId}`;

      try {

        const response = await fetch( selectedUsers.length === 0 ? singleUrl : multiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(selectedUsers.length === 0 ? {userId, userCategoryId} : [{userId, userCategoryId}] ),
        });
       
        if (!response.ok) {
          console.error(`Error assigning user: ${response.status} ${response.statusText}`);
          throw new Error("Failed to assign user");
        }

        const data = await response.json();
    
        toast.success("User assigned successfully");
        setShowAddMultipleUserModal(false)
        setLoading(false);
        
      } catch (error) {
        console.error("Error assigning user:", error);
        toast.error("Failed to assign user");
        setLoading(false);
      }
    };



    const handleSelectDeleteUser = (userId: number) => {
      const selectedUser = taskUsers.find(user => user.id === userId) || null;
      setUserToBeRemoved(selectedUser);
    };
    const handleDeleteTaskUser = async (userId: number, deleteReason: string) => {
      setLoading(true);
      try {
        const response = await fetch(`/api/periods/tasks/delete-user?id=${parsedTaskId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({userId, deleteReason}),
        });

        if (!response.ok) {
          toast.error("Failed to delete user");
        }
        

        toast.success("User removed successfully");
        setShowDeleteUserModal(false)

      } catch (error) {
        toast.error("Failed to delete user");
        throw error
      }
    }

    const handleCreateMilestone = async (milestoneSubject: string) =>{
      setLoading(true)
      try {
        const singleUrl = `/api/periods/tasks/milestone/create-milestone?id=${parsedTaskId}`;
        const multiUrl = `/api/periods/tasks/milestone/create-milestone/bulk?id=${parsedTaskId}`;
        const response = await fetch( multiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`,
          },
          // selectedMilestoneSubjects.length == 0 ? singleUrl :
          // selectedMilestoneSubjects.length == 0 ? {subject: milestoneSubject} :
          // selectedMilestoneSubjects
          body: JSON.stringify(  selectedMilestoneSubjects ),
        });
     
        if (!response.ok) {
          console.error(`Error creating milestone: ${response.status} ${response.statusText}`);
          throw new Error("Failed to create milestone");
        }

        const data = await response.json();
    
        toast.success("Milestone created successfully");
        setShowCreateMilestoneModal(false)
        setLoading(false);
        
      } catch (error) {
        console.error("Error creating milestone:", error);
        toast.error("Failed to create milestone");
        setLoading(false);
      }
    }

    const handleSelectedMilestoneSubjects = async () => {
      if (milestoneSubject) {
        const milestoneObj = { subject: milestoneSubject };
        setSelectedMilestoneSubjects(Prev => [...Prev, milestoneObj]);
      }
    }

    const handleDeleteMilestone = async (id: number) => {
      setLoading(true);

      try {
        const response = await fetch(`/api/periods/tasks/milestone/delete-milestone?id=${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({id}),
        });

        if (!response.ok) {
          toast.error("Failed to remove milestone");
        }

        toast.success("Milestone removed successfully");
        setShowDeleteMilestoneModal(false)

      } catch (error) {
        toast.error("Failed to delete milestone");
        throw error
      }
    }



    const handleSelectMilestone = async (id: number) => {
      setLoading(true)
              try {
          const response = await fetch(`/api/periods/tasks/milestone/get-milestones/${id}?id=${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "authorization": `Bearer ${token}`,
            },
          });
    
          if (!response.ok) {
            console.log(`Error fetching task: ${response.status} ${response.text()}`);
            throw new Error("Failed to fetch task");
          }
    
          const data = await response.json();
         setSelectedMilestone(data.data)
         setShowMilestoneDetailsModal(true);
    
          return data;
        } catch (error) {
          console.error("Error fetching task:", error);
          if (error instanceof Error) {
            console.error("Error fetching task:", error.message, error.stack);
          } else {
            console.error("Error fetching task: Unknown error", error);
          }
          throw error; // Re-throw the error to handle it in the calling function
        }
    }

    const handleUpdateMilestone = async (statusId: number, milestoneId: number) => {
      setLoading(true)
       try {
          const response = await fetch(`/api/periods/tasks/milestone/update-milestone/${milestoneId}?id=${milestoneId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({statusId: statusId}),
          });
  
          if (!response.ok) {
            console.error(`Error updating milestone: ${response.status} ${response.statusText}`);
            throw new Error("Failed to update milestone");
          }
  
          const data = await response.json();
          toast.success("Milestone updated successfully");
          setShowUpdateMilestoneModal(false);
          setLoading(false);
         
        } catch (error) {
          console.error("Error updating milestone:", error);
          toast.error("Failed to update milestone");
          setLoading(false);
        }
    }

    const handleComment = async (userId: number, comment: string) => {
      setLoading(true);
      try {
        const response = await fetch(`/api/periods/tasks/comments/add-comment?id=${parsedTaskId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({userId, comment}),
        });
        if (!response.ok) {
          console.error(`Error adding comment: ${response.status} ${response.statusText}`);
          throw new Error("Failed to add comment");
        }
        const data = await response.json();
        toast.success("Comment added successfully");
        setShowAddCommentModal(false);
        setLoading(false);
      } catch (error) {
        console.error("Error adding comment:", error);
        toast.error("Failed to add comment");
        setLoading(false);
      }
    }
    const handleUpdateComment = async (userId: number, comment: string) => {
      setLoading(true);
      try {
        const response = await fetch(`/api/periods/tasks/comments/update-comment?id=${commentIdToBeUpdated}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({userId, comment}),
        });
        if (!response.ok) {
          console.error(`Error updating comment: ${response.status} ${response.statusText}`);
          throw new Error("Failed to update comment");
        }
        const data = await response.json();
        toast.success("Comment updated successfully");
        setShowUpdateCommentModal(false);
        setLoading(false);
      } catch (error) {
        console.error("Error updating comment:", error);
        toast.error("Failed to update comment");
        setLoading(false);
      }
    }

    const handleDeleteComment = async (commentId: number) => {
      setLoading(true);
      try {
        const response = await fetch(`/api/periods/tasks/comments/delete-comment?id=${commentId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          console.error(`Error deleting comment: ${response.status} ${response.statusText}`);
          throw new Error("Failed to delete comment");
        }
        const data = await response.json();
        toast.success("Comment deleted successfully");
        setLoading(false);
      } catch (error) {
        console.error("Error deleting comment:", error);
        toast.error("Failed to delete comment");
        setLoading(false);
      }
    }

  return (
    <div className='page-container'>
    <Header pageName="Activity Information" moduleName="Period Activity Detail" userName={userName}/>
     <div className="row mt-5" style={{ width: "100%", padding: "20px"}}>
      <div className="col-xl-12 col-ml-12 col-lg-12 mt-5">
        <div className="card border-left-primary">
          <div className="card-body">
            <h4 className="header-title">Period Task Information</h4>
            <hr />
            <div className="row">
              <div className="col-md-7 mb-5">
                <h6 className="header-title">Task Details</h6>
            
                <form noValidate>
                  <div className="form-row">
                    <div className="col-md-8 mb-3">
                      <label>Name</label>
                      <input type="text" className="form-control text-secondary" disabled value={fetchedTask ? fetchedTask.name : ''} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-8 mb-3">
                      <label>Description</label>
                      <textarea rows={5} className="form-control text-secondary" disabled value={fetchedTask ? fetchedTask.description : ' '}></textarea>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Timeline Formula</label>
                    <input type="text" className="form-control text-secondary" disabled value="D + 25" />
                  </div>
                  <div className="form-row">
                    <div className="col-md-6 mb-3">
                      <label>Date Created</label>
                      <div className="text-secondary font-italic">{fetchedTask ? fetchedTask.dateCreated : ''}</div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Start Date</label>
                      <div className="text-secondary font-italic">{fetchedTask ? fetchedTask.startDate : ''}</div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-6 mb-3">
                      <label>Expected End Date</label>
                      <div className="text-secondary font-italic">{fetchedTask ? fetchedTask.dueDate : ''}</div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>End Date</label>
                      <div className="text-secondary font-italic">{fetchedTask ? fetchedTask.endDate : ''}</div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-6 mb-3">
                      <label>Delay Time</label>
                      <input type="text" className="form-control border-bottom-danger" disabled placeholder={fetchedTask ? fetchedTask.delayTime : "7 Days 20 Hours"} />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Status</label>
                      <div><span className={`badge badge-pill badge-${statusColor(fetchedTask.status)} font-14 ${fetchedTask.status === 'Not Started' && 'text-secondary'}`} >{fetchedTask ? fetchedTask.status : ''}</span></div>
                    </div>
                  </div>
                  <br />
                  {/* <button className="btn btn-outline-primary mr-2" type="button"><i className="fa fa-tasks"></i>&nbsp;Start Task</button> */}
                  <button className="btn btn-primary mx-1" type="button" data-toggle="modal" data-target="#updateTaskModal" onClick={() => setShowUpdateModal(true)}><i className="fa fa-edit"></i>&nbsp;Update Task</button>
                  <button className="btn btn-outline-primary mx-1" type="button" data-toggle="modal" data-target="#addUserModal" onClick={() => setShowAddMultipleUserModal(true)}><i className="fa fa-user-plus"></i>&nbsp;Add Users</button>
                  <button className="btn btn-outline-danger my-1 mx-1" type="button" onClick={handleCancelTask}><i className="fa fa-times"></i>&nbsp;Cancel Task</button>
                  <button className="btn btn-outline-warning my-1 mx-1" type="button" data-toggle="modal" data-target="#addCommentModal" onClick={() => setShowAddCommentModal(true)}><i className="fa fa-comments"></i>&nbsp;Comment on Task</button>
                </form>
              </div>

              <div className="col-md-5 mb-5">
                <div className="card">
                  <div className="card-body">
                    <h6 className="header-title">Milestones</h6>
                    <ul className="list-group">
                      
                      {fetchedTaskMilestones.map(milestone => (
                        <li key={milestone.id} className="list-group-item d-flex justify-content-between align-items-center">
                          {milestone.name}
                          <span  className={`status-badge ${milestone.status ? milestone.status.toLowerCase() : ""}`}>
                            {milestone.status}
                          </span>
                        </li>
                      ))}
                     
                    </ul>
                  </div>
                </div>
                <button className="btn btn-success mx-3 align-self-end m-3" type="button" data-toggle="modal" data-target="#updateTaskModal" onClick={() => setShowCreateMilestoneModal(true)}><i className="fa fa-edit"></i>&nbsp;Create Milestone</button>
              </div>
            </div>

            <hr />
      
            <div className="row mt-2">
              <div className="col-12 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h6 className="header-title">Task Users</h6>
                    <div className="table-responsive">
                    <table
                      className="table table-borderless"
                      id="dataTable"
                      width="100%"
                      cellSpacing="0"
                    >
                
                      <thead className="bg-light">
                        <tr>
                          <th>Id</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Email Address</th>
                          <th>Task Name</th>
                          <th>User Category</th>
                          <th>&nbsp;</th>
                        </tr>
                      </thead>
                      <tbody>
                          {taskUsers.map((taskUser) => (
                          <tr key={taskUser.id}>
                            <td>{taskUser.id}</td>
                            <td>{taskUser.user.firstName}</td>
                            <td>{taskUser.user.lastName}</td>
                            <td>{taskUser.user.emailAddress}</td>
                            <td>{taskUser.task.name}</td>
                            <td>{taskUser.userCategory.name}</td>
                            <td>
                              <PopupState
                                variant="popover"
                                popupId="demo-popup-popover"
                              >
                                {(popupState) => (
                                  <div>
                                    <Button {...bindTrigger(popupState)}>
                                      <i className="fa fa-ellipsis-h"></i>
                                    </Button>
                                    <Popover
                                      {...bindPopover(popupState)}
                                      anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "center",
                                      }}
                                      transformOrigin={{
                                        vertical: "top",
                                        horizontal: "center",
                                      }}
                                    >
                                      {/* <Typography sx={{ p: 2 }}>The content of the Popover.</Typography> */}
                                      <span><a className="btn btn-outline-danger" onClick={() => { setShowDeleteUserModal(true); handleSelectDeleteUser(taskUser.id); setUserToBeRemoved(taskUser) }} data-toggle="modal" data-target="#deleteUserModal"><i className="fa fa-remove">&nbsp; Remove</i></a></span>
                                    </Popover>
                                  </div>
                                )}
                              </PopupState>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
            </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-12 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h6 className="header-title">Task Milestones</h6>
                    <div className="table-responsive">
                    <table
                      className="table table-borderless"
                      id="dataTable"
                      width="100%"
                      cellSpacing="0"
                    >
                      <thead className="bg-light">
                        <tr>
                          <th>Id</th>
                          <th>Name</th>
                          <th>Task</th>
                          <th>Status</th>
                          <th>Date Created</th>
                          <th>&nbsp;</th>
                        </tr>
                      </thead>
                      <tbody>
                          {fetchedTaskMilestones.map((milestone) => (
                          <tr key={milestone.id}>
                            <td>{milestone.id}</td>
                            <td>{milestone.name}</td>
                            <td>{milestone.task.name}</td>
                            <td>
                              <span
                                className={`status-badge ${
                                  milestone.status ? milestone.status.toLowerCase() : ""
                                }`}
                              >
                                {milestone.status}
                              </span>
                            </td>
                            <td><TimeAgo timestamp={milestone.dateCreated}/></td>
                            <td>
                              <PopupState
                                variant="popover"
                                popupId="demo-popup-popover"
                              >
                                {(popupState) => (
                                  <div>
                                    <Button {...bindTrigger(popupState)}>
                                      <i className="fa fa-ellipsis-h"></i>
                                    </Button>
                                    <Popover
                                      {...bindPopover(popupState)}
                                      anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "center",
                                      }}
                                      transformOrigin={{
                                        vertical: "top",
                                        horizontal: "center",
                                      }}
                                    >
                                     <div
                                        className="d-flex flex-column align-items-start p-2"
                                        style={{
                                          backgroundColor: "transparent",
                                          border: "none",
                                        }}
                                      >
                                        <button
                                          className="btn w-100"
                                          style={{ color: "inherit" }}
                                          onMouseEnter={(e) => (e.currentTarget.style.color = "blue")}
                                          onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}
                                          onClick={() => {
                                          
                                          handleSelectMilestone(milestone.id);
                                          }}
                                        >
                                          <i className="fa fa-eye"></i>&nbsp;View
                                        </button>

                                        <button
                                          className="btn w-100"
                                          style={{ color: "inherit" }}
                                          onMouseEnter={(e) => (e.currentTarget.style.color = "gold")}
                                          onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}
                                          onClick={() => {
                                            setShowUpdateMilestoneModal(true);
                                            setSelectedMilestoneId(milestone.id);
                                            setSelectedMilestoneName(milestone.name);
                                          }}
                                        >
                                          <i className="fa fa-pencil"></i>&nbsp;Update
                                        </button>

                                        <button
                                          className="btn w-100"
                                          style={{ color: "inherit" }}
                                          onMouseEnter={(e) => (e.currentTarget.style.color = "red")}
                                          onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}
                                          onClick={() => {
                                            setShowDeleteMilestoneModal(true);
                                            setMilestoneToBeDeleted(milestone.id);
                                          }}
                                        >
                                          <i className="fa fa-remove"></i>&nbsp;Remove
                                        </button>
                                      </div>
                                    </Popover>
                                  </div>
                                )}
                              </PopupState>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-5 mb-5">
                <div className="card">
                  <div className="card-body">
                    <h6 className="header-title">Users</h6>
                    <ul className="list-group">
                      {Array(7).fill("Dun-Smart Avong").map((name, idx) => (
                        <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                          {name}
                          <span><a className="btn btn-outline-danger"><i className="fa fa-remove">&nbsp; Remove</i></a></span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-7 mb-5">
                <div className="card">
                  <div className="card-body">
                    <h6 className="header-title">Comments/Feedbacks</h6>
                    <div className="list-group">
                      {taskComments.map((comment, id) => (
                        <div key={id} className="list-group-item list-group-item-action flex-column align-items-start">
                          <div className="d-flex w-100 justify-content-between">
                            <h6 className="mb-1 text-primary" style={{ fontSize: "12px" }}>{comment.user.firstName }  {comment.user.lastName}</h6>
                            <small><TimeAgo timestamp={comment.dateCommented} /></small>
                          </div>
                          <h6 style={{ fontSize: "12px", marginTop: "4px" }}><b>Task Name:</b> {comment.task.name}</h6>
                          <p className="mb-1 font-14">{comment.comment}</p>
                          <div>
                            {/* <small className="font-12 text-secondary">Status: <span className="font-italic">Reviewed</span></small> */}
                           

                            <button className="btn btn-outline-danger btn-sm float-right ml-2" type="button"
                             onClick={()=> { handleDeleteComment(id)}}
                            >
                              <i className="fa fa-trash  font-14"></i>
                            </button>
                            <button className="btn btn-outline-warning btn-sm float-right" type="button"
                            onClick={()=> {setCommentIdToBeUpdated(id),setShowUpdateCommentModal(true)}}
                            >
                              <i className="fa fa-pencil  font-14"></i>
                            </button>
                           
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal */}
            <div className="modal fade" id="addUserModal">
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Add Activity User</h5>
                    <button type="button" className="close" data-dismiss="modal"><span>&times;</span></button>
                  </div>
                  <div className="modal-body">
                    <form noValidate>
                      <div className="form-row">
                        <div className="col-md-12 mb-3">
                          <label>Name or Title</label>
                          <select className="form-control">
                            <option>Select User</option>
                            <option>Dun-Smart Avong</option>
                            <option>Ademola Adeniran</option>
                            <option>Dotun Oluwadamilare</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="col-md-12 mb-3">
                          <label>User Category</label>
                          <select className="form-control">
                            <option>Select User</option>
                            <option>Responsible Party (R)</option>
                            <option>Consulted Party (C)</option>
                            <option>Accountable Party (A)</option>
                          </select>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-primary btn-block">
                      <i className="fa fa-plus-circle"></i>&nbsp;Add User
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>


      {showUpdateModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)",backdropFilter: "blur(5px)", overflowY: "scroll" }} id="updateTaskModal">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Task</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowUpdateModal(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-row">
                    <div className="col-md-12 mb-3">
                      <label>Name or Title</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name or Title of Period"
                        value={name? name :""}
                        onChange={(e)=> setName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-12 mb-3">
                      <label>Description</label>
                      <textarea
                        className="form-control"
                        rows={4}
                        placeholder="Give a brief of the lifting period."
                        value={description? description : ""}
                        onChange={(e)=> setDescription(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-12 mb-3">
                      <label>Formulae</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Formulae"
                        value={formulae ? formulae : ""}
                        onChange={(e)=> setFormulae(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-12 mb-3">
                      <label>Formulae Summary</label>
                      <textarea
                        className="form-control"
                        rows={4}
                        placeholder="Give a brief of the formulae."
                        value={formulaeSummary ? formulaeSummary : ""}
                        onChange={(e)=> setFormulaeSummary(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-6 mb-3">
                      <label>Start Date</label>
                      <input type="date" className="form-control" 
                        value={startDate ? startDate :  ""}
                        onChange={(e)=> setStartDate(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Expected End Date</label>
                      <input type="date" className="form-control" 
                         value={expectedEndDate? expectedEndDate : "" }
                        onChange={(e)=> setExpectedEndDate(e.target.value)}
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-primary btn-block w-100"
                  disabled={loading}
                  onClick={() => handleUpdateTask( name, description, formulae, formulaeSummary, startDate, expectedEndDate)}
                >
                  <i className="fa fa-plus-circle"></i>&nbsp; {loading ? "Updating..." : "Update Task"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showDeleteUserModal && (
        <div
          className="modal  show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(5px)", }}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Remove User From Task</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowDeleteUserModal(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form className="needs-validation" noValidate>
                  <div className="form-row">
                    <div className="col-md-12 mb-3">
                      <label>Email Address</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="User Email Address"
                        value={userToBeRemoved ? userToBeRemoved.user.emailAddress : ""}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-12 mb-3">
                      <label>Removal Reason</label>
                      <textarea
                        className="form-control"
                        rows={4}
                        placeholder="State your reason for removing the user."
                        value={removalReason? removalReason : ""}
                        onChange={(e)=> setRemovalReason(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-danger btn-block"
                  onClick={() => userToBeRemoved && handleDeleteTaskUser(userToBeRemoved.id, removalReason)}
                >
                  <i className="fa fa-remove"></i>&nbsp;Remove User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showCreateMilestoneModal && (
        <div
          className="modal  show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(5px)", }}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create Task Milestone</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowCreateMilestoneModal(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form className="needs-validation" noValidate>
                  <div className="form-row">
                    <div className="col-md-12 mb-3">
                      <label>Milestone Subject</label>
                      <div className='d-flex align-items-center gap-2'>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Subject"
                          onChange={(e) => setMilestoneSubject(e.target.value)}
                          value={milestoneSubject? milestoneSubject : ""}
                        />
                        {/* <span className="d-flex justify-content-end align-items-center"> */}
                          <button type="button" className="btn btn-success text-sm" onClick={handleSelectedMilestoneSubjects}>
                            +
                          </button>
                        {/* </span>  */}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label>{selectedUsers.length > 0 && "Selected Users" }</label>
                    <ul className="list-group mb-3">
                      {selectedMilestoneSubjects.map((subject, index) => {
                        return (
                          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            {subject.subject}

                            <button
                              type="button" className="btn btn-danger btn-sm"
                              onClick={() => { setSelectedMilestoneSubjects(selectedMilestoneSubjects.filter(s => s !== subject))}}
                            >
                              &times;
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
     
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-success btn-block"
                  onClick={() => handleCreateMilestone(milestoneSubject)}
                >
                  <i className="fa fa-plus"></i>&nbsp; Create Milestone
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showDeleteMilestoneModal && (
        <div
          className="modal  show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(5px)", }}
          
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Remove Milestone From Task</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowDeleteMilestoneModal(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form className="needs-validation" noValidate>
                  <div className="form-row">
                    <div className="col-md-12 mb-3">
                      <h3>Are you sure you want to remove this Milestone?</h3>
                    </div>
                  </div>
         
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-danger btn-block"
                  onClick={() => milestoneToBeDeleted && handleDeleteMilestone(milestoneToBeDeleted)}
                >
                  <i className="fa fa-remove"></i>&nbsp; Yes Remove Milestone
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showMilestoneDetailsModal && (
          <div
            className="modal show d-block"
            tabIndex={-1}
            style={{backgroundColor: "rgba(0,0,0,0.6)",backdropFilter: "blur(5px)",}}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div
                className="modal-content shadow-lg border-0"
                style={{borderRadius: "12px",overflow: "hidden",}}
              >
                {/* Header */}
                <div
                  className="modal-header text-white"
                  style={{
                    background: "linear-gradient(135deg, #007bff, #6610f2)",
                    borderBottom: "none",
                  }}
                >
                  <h5 className="modal-title">
                    <i className="fa fa-flag-checkered"></i>&nbsp; Milestone Details
                  </h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setShowMilestoneDetailsModal(false)}
                    aria-label="Close"
                  ></button>
                </div>

                {/* Body */}
                <div className="modal-body py-4 px-4">
                  <div className="mb-3">
                    <label className="text-muted small fw-bold text-uppercase">
                      Milestone Name
                    </label>
                    <div
                      className="p-3 rounded bg-light border"
                      style={{ fontWeight: 500 }}
                    >
                      {selectedMilestone?.name || "-"}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="text-muted small fw-bold text-uppercase">
                      Task Name
                    </label>
                    <div
                      className="p-3 rounded bg-light border"
                      style={{ fontWeight: 500 }}
                    >
                      {selectedMilestone?.task?.name || "—"}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="text-muted small fw-bold text-uppercase">
                      Status
                    </label>
                    <div
                      className={`p-3 rounded border text-center fw-bold ${
                        selectedMilestone?.status === "Completed"
                          ? "bg-success text-white"
                          : selectedMilestone?.status === "In Progress"
                          ? "bg-warning text-dark"
                          : "bg-secondary text-white"
                      }`}
                    >
                      {selectedMilestone?.status || "Unknown"}
                    </div>
                  </div>

                  <div className="mb-2">
                    <label className="text-muted small fw-bold text-uppercase">
                      Date Created
                    </label>
                    <div className="p-3 rounded bg-light border">
                      {selectedMilestone?.dateCreated
                        ? new Date(selectedMilestone?.dateCreated).toLocaleString()
                        : "—"}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div
                  className="modal-footer"
                  style={{
                    borderTop: "none",
                    backgroundColor: "#f8f9fa",
                  }}
                >
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowMilestoneDetailsModal(false)}
                  >
                    <i className="fa fa-times"></i>&nbsp; Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      {showUpdateMilestoneModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)",backdropFilter: "blur(5px)", overflowY: "scroll" }} id="updateTaskModal">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Milestone</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowUpdateMilestoneModal(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-row">
                    <div className="col-md-12 mb-3">
                      <label>Milestone Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name or Title of Milestone"
                        value={ selectedMilestoneName ? selectedMilestoneName :""}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-12 mb-3">
                      <label>Status</label>
                      <select className="form-control" onChange={handleStatusChange}>
                        <option value="">Select Milestone Status</option>
                        {milestoneStatuses.map((status) => (
                          <option key={status.id} value={status.id}>
                            {status.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-primary btn-block w-100"
                  disabled={loading || milestoneStatusId == null || selectedMilestoneId == null}
                  onClick={() => {
                    if (milestoneStatusId == null || selectedMilestoneId == null) {
                      toast.error("Please select a status before updating the milestone");
                      return;
                    }
                    handleUpdateMilestone(milestoneStatusId, selectedMilestoneId);
                  }}
                >
                  <i className="fa fa-pencil"></i>&nbsp; {loading ? "Updating..." : "Update Milestone"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAddMultipleUserModal && (
        <div
          className="modal show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.5)",backdropFilter: "blur(5px)", }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
               <div>
                 <h5 className="modal-title">Assign Users To Task</h5>
                <p><i>select multiple user to add bulk</i></p>
               </div>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowAddMultipleUserModal(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form className="needs-validation" noValidate>
                  <div className="form-row">
                    <div className="col-md-6 mb-3">
                      <label>Users</label>
                      <select className="form-control" onChange={handleUserChange}>
                        <option value="">Select Users</option>
                        {users.map((user) => (
                          <option key={user.id} value={user.firstName}>
                            {user.firstName}
                          </option>
                        ))}
                      </select>
                
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Categories</label>
                      <select className="form-control" onChange={handleCategoryChange}>
                        <option value="">Select Category</option>
                        {taskUsersCategories.map((category) => (
                          <option key={category.id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>

                    <label>{selectedUsers.length > 0 && "Selected Users" }</label>
                    <ul className="list-group mb-3">
                      {selectedUsers.map((user, index) => {
                       
                          return (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                              {user.userFirstName} {user.userEmail}

                              <button
                                type="button" className="btn btn-danger btn-sm"
                                onClick={() => { setSelectedUsers(selectedUsers.filter(u => u.userId !== user.userId))}}
                              >
                                &times;
                              </button>
                        </li>
                      );
                    })}
                    </ul>
                    <div className="d-flex justify-content-end align-items-center">
                      <button type="button" className="btn btn-primary text-sm" onClick={handleCompileSelectedUsers}>
                       Add  +
                      </button>
                    </div>
             
                  </div>

                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  onClick={() => { 
                    selectedUsers.forEach((user) =>
                      handleAssignUser(user.userId, user.categoryId)
                    );
                  }}
                >
                  <i className="fa fa-plus-circle"></i>&nbsp;Assign Selected Users
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showAddCommentModal && (
        <div
          className="modal show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.5)",backdropFilter: "blur(5px)", }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
               <div>
                 <h5 className="modal-title">Leave Comment on Task</h5>
               </div>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowAddCommentModal(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form className="needs-validation" noValidate>
                  <div className="form-row">
                    <div className="col-md-12 mb-3">
                      <label>Comments</label>
                      <textarea
                        className="modern-textarea" 
                        name="comment" 
                        id="comment" 
                        placeholder="Write your comment..."
                        onChange={(e) => setComments(e.target.value)}
                        value={comments? comments: ""}
                      ></textarea>

                    </div>

                  </div>

                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  onClick={() => {
                    if (!user || user.id == null) {
                      toast.error("User not found. Please login again.");
                      return;
                    }
                    handleComment(user.id, comments);
                  }}
                >
                  <i className="fa fa-comments"></i>&nbsp;Leave Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showUpdateCommentModal && (
        <div
          className="modal show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.5)",backdropFilter: "blur(5px)", }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
               <div>
                 <h5 className="modal-title">Update Task Comment</h5>
               </div>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowUpdateCommentModal(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form className="needs-validation" noValidate>
                  <div className="form-row">
                    <div className="col-md-12 mb-3">
                      <label>Comments</label>
                      <textarea
                        className="modern-textarea" 
                        name="comment" 
                        id="comment" 
                        placeholder="Write your comment..."
                        onChange={(e) => setComments(e.target.value)}
                        value={comments? comments: ""}
                      ></textarea>
                    </div>
                  </div>
                </form>
              </div>

              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-warning btn-block"
                  onClick={() => {
                    if (!user || user.id == null) {
                      toast.error("User not found. Please login again.");
                      return;
                    }
                    handleUpdateComment(user.id, comments);
                  }}
                >
                  <i className="fa fa-comments"></i>&nbsp;Update Comment
                </button>
              </div>
  
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

const statusColor = (status: string): string => {
  switch (status) {
    case 'Not Published': return 'secondary';
    case 'Not Started': return 'light';
    case 'In Progress': return 'warning';
    case 'Terminated': return 'danger';
    case 'Cancelled': return 'danger';
    case 'Completed': return 'success';
    default: return 'primary';
  }
};

// const StyledButton = styled.button`
//   background: none;
//   color: inherit;
//   border: none;
//   &:hover {
//     color: ${(props) => props.hoverColor};
//   }
// `;


export default ActivityInformation;
