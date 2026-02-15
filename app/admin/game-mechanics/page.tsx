
import AdminButton from '@/components/admin/AdminButton';


export default function AdminGameMechanics() {
// TODO: backend integration 

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Game Mechanics</h1>
       
          <AdminButton label="+ New Mechanic" variant="create" />

      </div>

      
    </div>
  );
}
