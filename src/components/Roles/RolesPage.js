'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import DeleteModal from '@/components/Roles/DeleteModal';
import RoleCard from '@/components/Roles/RoleCard';
import "../../../styles/role.css";

export default function RolesPage({rolesData}) {

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    roleId: null,
  });
 

  const handleDeleteRole = (roleId) => {
    setRoles(roles.filter((r) => r.id !== roleId));
    setDeleteModal({ open: false, roleId: null });
    console.log(`Role ${roleId} deleted`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-primary ">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground">Authorization Roles</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage roles and permissions for your system</p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rolesData && rolesData?.map((role) => (
            <RoleCard
              key={role.id}
              role={role}
              onDelete={() => setDeleteModal({ open: true, roleId: role.id })}
            />
          ))}
        </div>

        {rolesData?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground">No roles found</p>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      <DeleteModal
        open={deleteModal.open}
        onOpenChange={(open) => setDeleteModal({ ...deleteModal, open })}
        onConfirm={() => deleteModal.roleId && handleDeleteRole(deleteModal.roleId)}
        title="Delete Role"
        description="Are you sure you want to delete this role? This action cannot be undone."
      />
    </div>
  );
}
