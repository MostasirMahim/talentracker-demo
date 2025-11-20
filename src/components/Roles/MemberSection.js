"use client";

import { Plus, User2, X } from "lucide-react";

export default function MembersSection({ members, onAddClick, onRemove }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">Members</h2>
        <button
          onClick={onAddClick}
          className="flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Member</span>
        </button>
      </div>

      {members.length > 0 ? (
        <div className="space-y-2">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between rounded-md border border-border bg-secondary/50 p-3 transition-colors hover:bg-secondary"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  
                  <User2 className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{member?.first_name} {member?.last_name}</p>
                  <p className="text-xs text-muted-foreground">
                    {member.email}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onRemove(member.id)}
                className="rounded p-1 transition-colors hover:bg-destructive/10 hover:text-destructive"
                aria-label="Remove member"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <p className="text-muted-foreground">No members assigned yet</p>
          <button
            onClick={onAddClick}
            className="mt-3 text-sm font-medium text-primary hover:underline"
          >
            Add first member
          </button>
        </div>
      )}
    </div>
  );
}
