import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaUpload, FaFile, FaFileAlt, FaEllipsisH, FaTrashAlt, FaDownload, FaEye } from 'react-icons/fa';
import { toast } from 'sonner';
import { fetchSubjects } from '../../redux/slices/subjectsSlice';
import { fetchDocuments, uploadDocumentAsync } from '../../redux/slices/documentsSlice';
import Button from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';

const SubjectDocuments = () => {
  const { subjectId } = useParams();
  const { subjects } = useSelector(state => state.subjects);
  const { documents, loading } = useSelector(state => state.documents);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showDropdown, setShowDropdown] = useState(null);
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchSubjects());
    dispatch(fetchDocuments());
  }, [dispatch]);
  
  const subject = subjects.find((s) => s.id === subjectId);
  const subjectDocuments = documents[subjectId] || [];

  const handleFileUpload = async (e) => {
    if (!e.target.files || !e.target.files[0] || !subjectId) return;
    
    const file = e.target.files[0];
    
    try {
      await dispatch(uploadDocumentAsync({ subjectId, file })).unwrap();
      toast.success(`File "${file.name}" uploaded successfully`);
    } catch (error) {
      toast.error("Failed to upload file");
    } finally {
      setIsDialogOpen(false);
    }
  };
  
  const toggleDropdown = (docId) => {
    if (showDropdown === docId) {
      setShowDropdown(null);
    } else {
      setShowDropdown(docId);
    }
  };
  
  if (!subject) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Subject not found</h2>
          <p className="text-gray-500 mt-2">The subject you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{subject.name}</h1>
          <p className="text-gray-500">
            {subject.documentCount} document{subject.documentCount !== 1 ? "s" : ""}
          </p>
        </div>
        
        {isDialogOpen ? (
          <div className="bg-white p-4 rounded-lg shadow-lg border z-10">
            <h3 className="text-lg font-semibold mb-2">Upload Document</h3>
            <p className="text-sm text-gray-500 mb-4">
              Upload a document to {subject.name}. Supported formats: PDF, DOCX, TXT.
            </p>
            <label 
              htmlFor="document-upload" 
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FaUpload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PDF, DOCX, TXT (Max 10MB)</p>
              </div>
              <input 
                id="document-upload" 
                type="file"
                className="hidden"
                accept=".pdf,.docx,.txt"
                onChange={handleFileUpload}
                disabled={loading}
              />
            </label>
            <div className="flex justify-end mt-4">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button
            className="bg-gradient-to-r from-purple-600 to-blue-500 text-white"
            onClick={() => setIsDialogOpen(true)}
          >
            <FaUpload className="w-4 h-4 mr-2" /> Upload Document
          </Button>
        )}
      </div>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
          <CardDescription>
            All documents uploaded to {subject.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-12 bg-gray-100 rounded"></div>
              <div className="h-12 bg-gray-100 rounded"></div>
              <div className="h-12 bg-gray-100 rounded"></div>
            </div>
          ) : subjectDocuments.length === 0 ? (
            <div className="text-center py-8">
              <FaFileAlt className="h-10 w-10 mx-auto text-gray-400 mb-3" />
              <h3 className="text-lg font-medium">No documents yet</h3>
              <p className="text-sm text-gray-500 mb-4">
                Upload your first document to get started
              </p>
              <Button 
                className="bg-gradient-to-r from-purple-600 to-blue-500 text-white" 
                onClick={() => setIsDialogOpen(true)}
              >
                <FaUpload className="h-4 w-4 mr-2" /> Upload Document
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b">
                    <th className="font-medium p-3">Name</th>
                    <th className="font-medium p-3">Type</th>
                    <th className="font-medium p-3">Size</th>
                    <th className="font-medium p-3">Upload Date</th>
                    <th className="font-medium p-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {subjectDocuments.map((doc) => (
                    <tr key={doc.id} className="border-b">
                      <td className="p-3 font-medium">
                        <div className="flex items-center space-x-2">
                          <FaFile className="h-4 w-4 text-gray-400" />
                          <span>{doc.name}</span>
                        </div>
                      </td>
                      <td className="p-3">{doc.fileType}</td>
                      <td className="p-3">{doc.fileSize}</td>
                      <td className="p-3">
                        {new Date(doc.uploadDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="p-3 relative">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => toggleDropdown(doc.id)}
                        >
                          <FaEllipsisH className="h-4 w-4" />
                        </Button>
                        
                        {showDropdown === doc.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                            <div className="py-1">
                              <button 
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                onClick={() => {
                                  toggleDropdown(null);
                                  // Handle view action
                                  toast.info("Viewing document...");
                                }}
                              >
                                <FaEye className="mr-2 h-4 w-4" />
                                View
                              </button>
                              <button 
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                onClick={() => {
                                  toggleDropdown(null);
                                  // Handle download action
                                  toast.info("Downloading document...");
                                }}
                              >
                                <FaDownload className="mr-2 h-4 w-4" />
                                Download
                              </button>
                              <div className="border-t my-1"></div>
                              <button 
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                                onClick={() => {
                                  toggleDropdown(null);
                                  // Handle delete action
                                  toast.error("Document deleted");
                                }}
                              >
                                <FaTrashAlt className="mr-2 h-4 w-4" />
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SubjectDocuments;