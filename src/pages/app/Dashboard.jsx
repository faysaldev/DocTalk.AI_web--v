import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus, FaSearch, FaBookOpen, FaUpload } from "react-icons/fa";
import { toast } from "sonner";
import { RiChatVoiceAiLine } from "react-icons/ri";

import { fetchSubjects } from "../../redux/slices/subjectsSlice";
import Button from "../../components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Label from "../../components/ui/Label";
import { cn } from "../../utils/cn";
import { setSubjects } from "../../redux/slice/subjectsSlice";
import UploadModal from "../../components/UploadModal";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const { subjects, loading } = useSelector((state) => state.subjects);
  // const [newSubjectName, setNewSubjectName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newFileUploaded, setNewFileUploaded] = useState(false)
  const dispatch = useDispatch();
  const axiosSecure = useAxiosSecure();

  console.log(subjects,"subject form api")










  const fetchingSubject = async () => {
    try {
      const response = await axiosSecure.get(`/api/documents/categories`)
      const api_sub = response?.data?.data?.categories;
      dispatch(setSubjects(api_sub))
    } catch (error) {
      console.log(error.message)
    }
  }


  useEffect(() => {
    fetchingSubject();
  }, [newFileUploaded]);

  // Convert the created_at field to a readable date-time format
const formatDateTime = (isoDateString) => {
  const date = new Date(isoDateString);
  return date.toLocaleString(); // Adjusts to the local time zone and format
};

  // const handleAddSubject = (e) => {
  //   e.preventDefault();

  //   if (!newSubjectName.trim()) {
  //     toast.error("Subject name cannot be empty");
  //     return;
  //   }

  //   dispatch(addSubject(newSubjectName));
  //   toast.success(`Subject "${newSubjectName}" created`);
  //   setNewSubjectName("");
  //   setIsDialogOpen(false);

  //   // dispatch(addSubjectAsync(newSubjectName))
  //   //   .unwrap()
  //   //   .then(() => {
  //   //   })
  //   //   .catch((error) => {
  //   //     toast.error(error || "Failed to create subject");
  //   //   });
  // };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {currentUser?.name}</h1>
          <p className="text-gray-500">Manage your subjects and documents</p>
        </div>
        <div className="flex space-x-2 relative">
          <Button
            className="bg-gradient-to-r from-purple-600 to-blue-500 text-white"
            onClick={() => setIsDialogOpen(true)}
          >
            <FaPlus className="w-4 h-4 mr-2" /> New Subject
          </Button>

          <Link to="/chat">
            <Button variant="outline">
              <RiChatVoiceAiLine className="w-4 h-4 mr-2" /> AI Chat
            </Button>
          </Link>
        </div>
      </div>


      {/* Subjects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <Card className="col-span-full bg-gray-50 animate-pulse">
            <CardContent className="h-40"></CardContent>
          </Card>
        ) : subjects.length === 0 ? (
          <Card className="col-span-full border-dashed border-2 bg-gray-50">
            <CardContent className="pt-6 text-center py-12">
              <div className="flex flex-col items-center justify-center space-y-4">
                <FaBookOpen className="h-10 w-10 text-gray-400" />
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">No subjects yet</h3>
                  <p className="text-sm text-gray-500">
                    Create your first subject to get started
                  </p>
                </div>
                <Button
                  className="bg-gradient-to-r from-purple-600 to-blue-500 text-white mt-2"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <FaPlus className="h-4 w-4 mr-2" /> Add Subject
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          subjects.map((subject) => (
          <Link key={subject.id} to={`/subject/${subject.id}?name=${encodeURIComponent(subject.name)}`}>
              <Card className="h-full cursor-pointer hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <CardHeader
                  className={cn(
                    "flex flex-row items-center justify-between pb-2"
                  )}
                >
                  <div className="flex items-center space-x-2">
                    <div
                      className={cn("w-4 h-4 rounded-full", subject.color)}
                    />
                    <CardTitle>{subject.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm pb-2">
                    {subject.documentCount} document
                    {subject.documentCount !== 1 ? "s" : ""}
                  </CardDescription>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-gray-500">
                      Created on: {" "}
                      {formatDateTime(subject?.created_at)}
                    </span>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <FaUpload className="h-3.5 w-3.5" />
                      <span className="text-xs">Upload</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* <Card>
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <FaUpload className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Upload Documents</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Upload new documents to your subjects
                  </p>
                  <Button variant="outline" size="sm">
                    Upload
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card> */}

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <FaSearch className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Ask AI</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Get answers from your documents using AI
                  </p>
                  <Link to="/chat">
                    <Button variant="outline" size="sm">
                      Chat with AI
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <FaBookOpen className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Create Subject</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Add a new subject category
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    Create
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <UploadModal setIsDialogOpen={setIsDialogOpen} setNewFileUploaded={setNewFileUploaded} isOpen={isDialogOpen} />


      {/* {isDialogOpen && <UploadModal /> } */}
    </div>
  );
};

export default Dashboard;
