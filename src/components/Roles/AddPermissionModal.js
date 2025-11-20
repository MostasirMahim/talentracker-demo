'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';


export default function AddPermissionModal({
  open,
  onOpenChange,
  allPermissions,
  assignedPermissions,
  onAdd,
}) {
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [newPermissionName, setNewPermissionName] = useState('');
  const { register, handleSubmit, reset } = useForm();

  const availablePermissions = allPermissions.filter(
    (p) => !assignedPermissions.some((ap) => ap.id === p.id)
  );

  const handleAddNewPermission = () => {
    if (newPermissionName.trim()) {
      console.log('[v0] New permission created:', newPermissionName);
      setNewPermissionName('');
    }
  };

  const handleDone = () => {
    const selected = availablePermissions.filter((p) =>
      selectedPermissions.includes(p.id)
    ).map((p) => p.id);
    onAdd(selected);
    console.log('Permissions selected:', selected);
    setSelectedPermissions([]);
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-lg border border-border bg-card p-6 shadow-lg">
        <button
          onClick={() => {
            onOpenChange(false);
            setSelectedPermissions([]);
            setNewPermissionName('');
          }}
          className="absolute right-4 top-4 rounded p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <h2 className="text-lg font-bold text-foreground">Add Permissions</h2>

        {/* Create New Permission Section */}
        <div className="mt-6 space-y-3">
          <label className="block text-sm font-medium text-foreground">
            Create New Permission
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Permission name"
              value={newPermissionName}
              onChange={(e) => setNewPermissionName(e.target.value)}
              className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              onClick={handleAddNewPermission}
              className="rounded-md bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
            >
              Create
            </button>
          </div>
        </div>

        {/* Available Permissions Section */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-foreground mb-3">
            Available Permissions
          </label>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {availablePermissions.length > 0 ? (
              availablePermissions.map((permission) => (
                <label
                  key={permission.id}
                  className="flex items-center gap-3 rounded-md border border-border bg-secondary/50 p-3 cursor-pointer transition-colors hover:bg-secondary"
                >
                  <input
                    type="checkbox"
                    checked={selectedPermissions.includes(permission.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedPermissions([...selectedPermissions, permission.id]);
                      } else {
                        setSelectedPermissions(
                          selectedPermissions.filter((id) => id !== permission.id)
                        );
                      }
                    }}
                    className="h-4 w-4 rounded border-border bg-background cursor-pointer accent-primary"
                  />
                  <div>
                    <p className="font-medium text-foreground">{permission.name}</p>
                    <p className="text-xs text-muted-foreground">{permission.code}</p>
                  </div>
                </label>
              ))
            ) : (
              <p className="text-center text-sm text-muted-foreground py-4">
                All permissions are already assigned
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => {
              onOpenChange(false);
              setSelectedPermissions([]);
              setNewPermissionName('');
            }}
            className="flex-1 rounded-lg border border-border bg-card px-4 py-2 font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Cancel
          </button>
          <button
            onClick={handleDone}
            className="flex-1 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
