import { useState } from "react";
import { X } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  desc: string;
  img: string;
}

interface TeamModalProps {
  member: TeamMember | null;
  onClose: () => void;
}

export default function TeamModal({ member, onClose }: TeamModalProps) {
  if (!member) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-body">
          <img src={member.img} alt={member.name} className="modal-img" />
          <h2>{member.name}</h2>
          <h4>{member.role}</h4>
          <p>{member.desc}</p>
        </div>
      </div>
    </div>
  );
}
