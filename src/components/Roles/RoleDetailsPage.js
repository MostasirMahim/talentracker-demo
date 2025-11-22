"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import RoleHeader from "@/components/Roles/RoleHeader";
import PermissionsSection from "@/components/Roles/PermissionsSection";
import MembersSection from "@/components/Roles/MemberSection";
import AddPermissionModal from "@/components/Roles/AddPermissionModal";
import AddMembersModal from "@/components/Roles/AddMembersModal";
import EditRoleModal from "@/components/Roles/EditRoleModal";


export default function RoleDetailsPage({ data, users, permissions:availablePermissions}) {
  const role = data?.role;
  const permissions = data?.role?.permissions || [];
  const members = data?.users || [];
  const roleName = data?.role?.name || "";

  const [showAddPermissionModal, setShowAddPermissionModal] = useState(false);
  const [showAddMembersModal, setShowAddMembersModal] = useState(false);
  const [showEditRoleModal, setShowEditRoleModal] = useState(false);

  const handleAddPermissions = (selectedPermissions) => {
    const newPermissions = selectedPermissions.filter(
      (p) => !permissions.some((perm) => perm.id === p.id)
    );
    console.log("[v0] Permissions added:", selectedPermissions);
  };

  const handleAddMembers = (selectedMembers) => {
    const newMembers = selectedMembers.filter(
      (m) => !members.some((mem) => mem.id === m.id)
    );
    console.log("[v0] Members added:", selectedMembers);
  };

  const handleEditRoleName = (newName) => {
    console.log("[v0] Role name updated:", newName);
  };

  const handleRemovePermission = (permissionId) => {
    console.log(permissionId);
  };

  const handleRemoveMember = (memberId) => {
    console.log(memberId);
  };

  if (!role) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Role not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <RoleHeader
        roleName={roleName}
        onEditClick={() => setShowEditRoleModal(true)}
      />

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Permissions Section */}
          <PermissionsSection
            permissions={permissions}
            onAddClick={() => setShowAddPermissionModal(true)}
            onRemove={handleRemovePermission}
          />

          {/* Members Section */}
          <MembersSection
            members={members}
            onAddClick={() => setShowAddMembersModal(true)}
            onRemove={handleRemoveMember}
            roleId={role?.id}
          />
        </div>
      </div>

      {/* Modals */}
      <AddPermissionModal
        open={showAddPermissionModal}
        onOpenChange={setShowAddPermissionModal}
        allPermissions={availablePermissions}
        assignedPermissions={permissions}
        onAdd={handleAddPermissions}
        roleId={role.id}
        roleName={roleName}
      />

      <AddMembersModal
        open={showAddMembersModal}
        onOpenChange={setShowAddMembersModal}
        allMembers={users}
        assignedMembers={members}
        onAdd={handleAddMembers}
        roleId={role.id}
      />

      <EditRoleModal
        open={showEditRoleModal}
        onOpenChange={setShowEditRoleModal}
        currentName={roleName}
        roleId={role.id}
        currentPermissions={permissions}
        onSave={handleEditRoleName}
      />
    </div>
  );
}
