import React, { useState } from "react";
import { FaUpload, FaTimes, FaFileAlt } from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";

const UploadModal = ({ isOpen, setIsDialogOpen }) => {


      const [subjectName, setSubjectName] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const axiosSecure = useAxiosSecure();

  const default_parameters = [
    "subject_name",
    "grade_level",
    "topic_title",
    "subtopics",
    "document_type",
    "author_name",
    "creation_date",
    "learning_objectives",
    "keywords",
    "page_count",
    "question_count",
    "has_images_or_diagrams",
    "language",
    "difficulty_level",
    "summary_or_abstract",
  ];

  const additional_prompt = "Extract all the information related to the this subject";

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
    const handleRemoveFile = () => {
    setFile(null);
    setProgress(0);
  };
//   const [subjectName, setSubjectName] = useState("");
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const axiosSecure = useAxiosSecure();
  

//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const handleRemoveFile = () => {
//     setFile(null);
//     setProgress(0);
//   };

//   const simulateUpload = () => {
//     return new Promise((resolve) => {
//       let progressValue = 0;
//       const interval = setInterval(() => {
//         progressValue += 10;
//         setProgress(progressValue);
//         if (progressValue >= 100) {
//           clearInterval(interval);
//           resolve();
//         }
//       }, 200);
//     });
//   };


    const handleSubmit = async (e) => {
    e.preventDefault();

    if (subjectName.trim() === "") {
      alert("Please enter a subject name.");
      return;
    }

    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("category", subjectName);
    formData.append("additional_prompt", additional_prompt);
    formData.append("parameters", JSON.stringify(default_parameters));
    formData.append("files", file);

    try {
      const response = await axiosSecure.post("/api/documents/upload", formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      });

      // Success message
      alert(`${file.name} has been successfully uploaded to ${subjectName}.`);
      
      // Reset form
      setFile(null);
      setProgress(0);
      setSubjectName("");
    } catch (error) {
      alert("There was a problem uploading your file.");
    } finally {
      setLoading(false);
    }

    setIsDialogOpen(false)
  };


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (subjectName.trim() === "") {
//       alert("Please enter a subject name.");
//       return;
//     }

//     if (!file) {
//       alert("Please select a file to upload.");
//       return;
//     }

//     setLoading(true);

//     try {
//       // Simulate the file upload with progress
//       await simulateUpload();

//       // Success message
//       alert(`${file.name} has been uploaded to ${subjectName}.`);

//       // Reset form
//       setLoading(false);
//       setProgress(0);
//       setFile(null);
//       setSubjectName("");
//       setIsDialogOpen(false);
//     } catch (error) {
//       setLoading(false);
//       alert("There was a problem uploading your file.");
//     }
//   };

  if (!isOpen) return null;

  const fileSize = file ? (file.size / (1024 * 1024)).toFixed(2) + " MB" : "";

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" style={{marginTop:'0px'}}>
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 relative border border-gray-200 md:w-[40%]">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition-colors"
          onClick={() => setIsDialogOpen(false)}
          aria-label="Close dialog"
        >
          <FaTimes size={20} />
        </button>

        <div className="flex justify-center mb-4">
          <img
            src="https://i.ibb.co.com/GvpFCs5d/doctalk-logo.png"
            alt="DocTalk Logo"
            className="h-16 object-contain"
          />
        </div>

        <h2 className="text-xl font-semibold text-center mb-6">Upload Document</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="subject-name" className="block text-sm font-medium text-gray-700 mb-1">
              Subject <span className="text-red-600">*</span>
            </label>
            <input
              id="subject-name"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              placeholder="e.g. Patient Records, Lab Results"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Document <span className="text-red-600">*</span></label>

            {!file ? (
              <div className="relative border-2 border-dashed rounded-lg border-gray-300 transition-colors duration-200 hover:bg-gray-50 cursor-pointer">
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleFileChange}
                  accept=".pdf,.docx,.txt"
                  disabled={loading}
                />
                <label htmlFor="file-upload" className="cursor-pointer w-full">
                  <div className="flex flex-col items-center justify-center py-6 px-4">
                    <FaUpload className="h-10 w-10 mb-2 text-gray-400" />

                    <div className="text-center">
                      <p className="text-sm text-gray-600 font-medium">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">PDF, DOCX, TXT (Max 10MB)</p>
                    </div>
                  </div>
                </label>
              </div>
            ) : (
              <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <FaFileAlt className="h-5 w-5 text-blue-600 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 truncate max-w-[200px]">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">{fileSize}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="text-gray-500 hover:text-red-500 transition-colors p-1"
                  >
                    <FaTimes size={18} />
                  </button>
                </div>

                {loading && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Uploading...</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 h-11 rounded-md font-medium ${!subjectName && !file? "cursor-not-allowed bg-blue-200 hover:bg-blue-300": ""}`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Uploading...
              </div>
            ) : (
              "Upload Document"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;






// import React, { useState } from "react";
// import { FaUpload } from "react-icons/fa";

// const UploadModal = ({ isOpen, setIsDialogOpen }) => {
//   const [newSubjectName, setNewSubjectName] = useState("");
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleFileUpload = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleAddSubject = (e) => {
//     e.preventDefault();
//     if (newSubjectName.trim() === "") {
//       alert("Subject name cannot be empty.");
//       return;
//     }
//     console.log("New Subject:", newSubjectName);
//     setNewSubjectName("");
//     setIsDialogOpen(false);
//   };

//   const handleFileSubmit = (e) => {
//     e.preventDefault();
//     if (!file) {
//       alert("Please select a file to upload.");
//       return;
//     }
//     console.log("File uploaded:", file.name);
//     setFile(null);
//     setIsDialogOpen(false);
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 -mt-4 w-full h-full" style={{marginTop:"0px"}}>
//       <div className="bg-white rounded-lg shadow-lg min-w-96 p-6 relative max-w[70%] w-[40%]">
//         <button
//           className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
//           onClick={()=> setIsDialogOpen(false)}
//         >
//           ✕
//         </button>
//         <h3 className="text-lg font-semibold mb-4">Manage Subjects & Files</h3>
//         <div className="space-y-6 grid grid-cols-1 md:space-y-0 md:space-x-3 md:grid-cols-1">
//           {/* Add Subject Section */}
//           <form onSubmit={handleAddSubject} className="space-y-4">
//             <div>
//               <label htmlFor="subject-name" className="block text-sm font-medium text-gray-700">
//                 Subject Name
//               </label>
//               <input
//                 id="subject-name"
//                 value={newSubjectName}
//                 onChange={(e) => setNewSubjectName(e.target.value)}
//                 placeholder="e.g. Mathematics"
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                 autoFocus
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
//             >
//               Create Subject
//             </button>
//           </form>

//           {/* Upload Document Section */}
//           <form onSubmit={handleFileSubmit} className="space-y-4">
//             <h4 className="text-md font-medium">Upload Document</h4>
//             <label
//               htmlFor="document-upload"
//               className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50"
//             >
//               <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                 <FaUpload className="w-8 h-8 text-gray-400 mb-2" />
//                 <p className="text-sm text-gray-500">
//                   <span className="font-semibold">Click to upload</span> or drag and drop
//                 </p>
//                 <p className="text-xs text-gray-500">PDF, DOCX, TXT (Max 10MB)</p>
//               </div>
//               <input
//                 id="document-upload"
//                 type="file"
//                 className="hidden"
//                 accept=".pdf,.docx,.txt"
//                 onChange={handleFileUpload}
//                 disabled={loading}
//               />
//             </label>
//             {file && (
//               <p className="text-sm text-gray-600">
//                 Selected File: <span className="font-medium">{file.name}</span>
//               </p>
//             )}
//             <button
//               type="submit"
//               className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md"
//             >
//               Upload File
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UploadModal;



