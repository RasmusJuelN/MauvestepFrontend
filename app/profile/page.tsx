'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import PageContainer from '@/components/layout/PageContainer';
import Link from 'next/link';
import Button from '@/components/shared/Button';
import { BiSolidPencil, BiCheck } from "react-icons/bi";
import AdminButton from '@/components/admin/AdminButton';
import { UserService } from '@/lib/services/userService';
import { UserDto } from '@/lib/types';
import { UpdateUserDto } from '@/lib/DTOs/user';
import { useAuth } from '@/lib/hooks/authContext';
import { getErrorMessage } from '@/lib/utilities/errorhandling/errorHandler';
import defaultProfilePic from '@/assets/images/profile-pic.png';


export default function ProfilePage() {
  const { updateUser } = useAuth();
  const [profileData, setProfileData] = useState<UserDto>({
    username: '',
    bio: '',
    profilePictureUrl: '',
    likesCount: 0,
    postCount: 0,
    id: '',
    email: '',
    role: '',
    createdAt: '',
  });

  const [editData, setEditData] = useState<UpdateUserDto>({
    username: '',
    bio: '',
    profilePictureUrl: '',
    email: '',
  });
  const [editingField, setEditingField] = useState<'username' | 'bio' | 'profilePictureUrl' | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStartProfileEditing = (field: 'username' | 'bio' | 'profilePictureUrl') => {
    setEditingField(field);
    setError(null);
  };

  const handleSaveProfileEditing = async (field: 'username' | 'bio' | 'profilePictureUrl') => {
    try {
      setIsSaving(true);
      setError(null);

      // Only send the fields to the backend if data in them has been changes so not everything gets updated if user just wants to change one thing 
      const updates: UpdateUserDto = {};
      if (field === 'username' && editData.username !== profileData.username) {
        updates.username = editData.username;
      } else if (field === 'bio' && editData.bio !== profileData.bio) {
        updates.bio = editData.bio;
      } 
      // else if (field === 'profilePictureUrl' && editData.profilePictureUrl !== profileData.profilePictureUrl) {
      //   updates.profilePictureUrl = editData.profilePictureUrl;
      // }

      const updatedUser = await UserService.updateProfile(updates);
      setProfileData(updatedUser);
      setEditData(updatedUser);
      updateUser(updatedUser); // Update auth context so ProfileCard re-renders
      setEditingField(null);
    } catch (err) {
      const errorMessage = getErrorMessage(err, 'Failed to save changes');
      setError(errorMessage);
      console.error('Error saving profile:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelProfileEditing = () => {
    setEditData(profileData);
    setEditingField(null);
    setError(null);
  };

  const handleResetPassword = () => {
  };

   useEffect(() => {
    // Fetch user profile data on component mount
    const fetchUserProfile = async () => {
      try {
        const userProfile = await UserService.getCurrentUser();
        setProfileData(userProfile);
        setEditData(userProfile);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <PageContainer>
      <div >

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-indigo-100 mb-2">Profile</h1>
          <div className="w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
        </div>


        <div className="flex flex-col gap-8">

          {error && (
            <div className="bg-red-900/30 p-4 rounded border border-red-700 text-red-200">
              {error}
            </div>
          )}

          <div className="">
            <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-700/50 rounded-lg p-8">
              <div className="flex flex-col lg-custom:flex-row gap-8 lg-custom:items-center">

                <div className="flex-shrink-0 flex flex-col lg-custom:flex-row lg-custom:items-start gap-8">
                  <div className="relative mx-auto lg-custom:mx-0">
                    <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-indigo-500 bg-indigo-700/0 flex items-center justify-center">
                       {/*TODO: Add picture handling*/}
                       <Image
                          src={defaultProfilePic}
                          alt="Default profile picture"
                          width={160}
                          height={160}
                          className="w-full h-full object-cover p-6"
                        />
                    </div>
                    
                  </div>

                  {/* Username and Bio - shown below picture on small screens, to the right on large screens */}
                  <div className="lg-custom:hidden flex flex-col gap-6 w-full">
                    <div>
                      {editingField === 'username' ? (
                        <div>
                          <input
                            type="text"
                            value={editData.username}
                            onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                            className="w-full bg-indigo-800 text-indigo-100 border border-indigo-500 px-3 py-1 rounded text-3xl font-semibold mb-2"
                            autoFocus
                          />

                          {/*TODO: change to normal buttons and not adminbuttons */}
                          <div className="flex gap-2">
                            <AdminButton
                              label="Save"
                              variant="save"
                              onClick={() => handleSaveProfileEditing('username')}
                              disabled={isSaving}
                            />
                            <AdminButton label="Cancel" variant="cancel" onClick={handleCancelProfileEditing} disabled={isSaving} />
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-start gap-2">
                          <h2 className="text-3xl font-semibold text-indigo-100">{profileData.username}</h2>
                          <AdminButton
                            label="Edit"
                            variant="edit"
                            onClick={() => handleStartProfileEditing('username')}
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      {editingField === 'bio' ? (
                        <div>
                          <textarea
                            value={editData.bio || ''}
                            onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                            className="w-full bg-indigo-800 text-indigo-100 border border-indigo-500 px-3 py-2 rounded h-24 resize-none mb-2"
                            autoFocus
                          />
                          <div className="flex gap-2">
                            <AdminButton
                              label="Save"
                              variant="save"
                              onClick={() => handleSaveProfileEditing('bio')}
                              disabled={isSaving}
                            />
                            <AdminButton label="Cancel" variant="cancel" onClick={handleCancelProfileEditing} disabled={isSaving} />
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-start gap-3">
                          <p className="text-indigo-300 italic text-lg flex-1">{profileData.bio}</p>
                          <AdminButton
                            label="Edit"
                            variant="edit"
                            onClick={() => handleStartProfileEditing('bio')}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>


                <div className="flex-1 hidden lg-custom:block">

                  <div className="mb-6">
                    {editingField === 'username' ? (
                      <div>
                        <input
                          type="text"
                          value={editData.username}
                          onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                          className="w-full bg-indigo-800 text-indigo-100 border border-indigo-500 px-3 py-1 rounded text-3xl font-semibold mb-2"
                          autoFocus
                        />
                        <div className="flex gap-2">
                          <AdminButton
                            label="Save"
                            variant="save"
                            onClick={() => handleSaveProfileEditing('username')}
                            disabled={isSaving}
                          />
                          <AdminButton label="Cancel" variant="cancel" onClick={handleCancelProfileEditing} disabled={isSaving} />
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-start">
                        <h2 className="text-3xl font-semibold text-indigo-100">{profileData.username}</h2>
                        <AdminButton
                          label="Edit"
                          variant="edit"
                          onClick={() => handleStartProfileEditing('username')}
                        />
                      </div>
                    )}
                   
                   
                  </div>


                  <div>
                    {editingField === 'bio' ? (
                      <div>
                        <textarea
                          value={editData.bio || ''}
                          onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                          className="w-full bg-indigo-800 text-indigo-100 border border-indigo-500 px-3 py-2 rounded h-24 resize-none mb-2"
                          autoFocus
                        />
                        <div className="flex gap-2">
                          <AdminButton
                            label="Save"
                            variant="save"
                            onClick={() => handleSaveProfileEditing('bio')}
                            disabled={isSaving}
                          />
                          <AdminButton label="Cancel" variant="cancel" onClick={handleCancelProfileEditing} disabled={isSaving} />
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-start gap-3">
                        <p className="text-indigo-300 italic text-lg flex-1">{profileData.bio}</p>
                        <AdminButton
                          label="Edit"
                          variant="edit"
                          onClick={() => handleStartProfileEditing('bio')}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>


              <div className="grid grid-cols-2 gap-6 border-t border-indigo-700/50 pt-6 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-400">{profileData.postCount}</div>
                  <div className="text-indigo-300">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-400">{profileData.likesCount}</div>
                  <div className="text-indigo-300">Likes</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-700/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-indigo-100 mb-4">More actions</h3>
              <AdminButton label="View All Posts & Comments" variant="view" className="w-full" />
              <AdminButton label="Reset Password" variant="edit" className="w-full mt-2" onClick={handleResetPassword} />
              <AdminButton label="Delete Account" variant="delete" className="w-full mt-2" /> {/* TODO: Delete account functonality for only the current user */}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
