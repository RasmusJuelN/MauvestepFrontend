import { useAuth } from '@/lib/hooks/authContext';
import Link from 'next/link';
import Button from '@/components/shared/Button';
import defaultProfilePic from '@/assets/images/profile-pic.png';
import Image from 'next/image';

export default function ProfileCard() {
    const { user, logout } = useAuth();
    
      const handleLogout = () => {
    logout(); 
    window.location.reload();
  };

    return (
        <div className="flex flex-col items-center text-center">

            <Link href="/profile" >
            <div className="w-24 h-24 mb-3 rounded-full overflow-hidden border-4 border-indigo-500 bg-indigo-700/20" >
                <Image
                    src={user?.profilePictureUrl || defaultProfilePic}
                    alt="Profile picture"
                    width={66}
                    height={66}
                    className="w-full h-full object-cover p-4"
                />
            </div>
                </Link>
            
            <h2 className="text-lg font-semibold text-indigo-100">{user?.username}</h2>
            <p className="text-sm text-indigo-300 italic">{user?.bio}</p>
            <div className="mt-4 flex space-x-4">
                <div className="text-center">
                    <div className="text-1xl font-bold text-indigo-400">{user?.postCount}</div>
                    <div className="text-sm text-indigo-100">Posts</div>
                </div>
                <div>
                    <div className="text-1xl font-bold text-indigo-400">{user?.likesCount}</div>
                    <div className="text-sm text-indigo-100">Likes</div>
                </div>
                
 
            </div>
            <Button
            onClick={handleLogout}
            variant="delete"
            fullWidth
            className="mt-4 text-sm"
          >
            Logout
          </Button>
        </div>
    );
}