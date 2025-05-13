import { useState } from "react";

import { EditScreenLayout } from "@/components/formElements/EditScreenLayout";
import { SaveCancelButtons } from "@/components/formElements/SaveCancelButtons";
import { StatusDropdown } from "@/components/formElements/StatusDropdown";
import { useFormEdit } from "@/hooks/useFormEdit";
import { statusConfigs, statusOptions } from "@/types/constants";
import { StatusOptionsType } from "@/types/healthRecordTypes";
import { validators } from "@/utils/validators";

const EditStatus = () => {
  const { localValue, setLocalValue, handleSave, loading } = useFormEdit("status", validators.status);
  const [openDropdown, setOpenDropdown] = useState<keyof StatusOptionsType | null>(null);

  const updateStatus = (field: string, value: keyof StatusOptionsType) => {
    const updatedStatus = { ...localValue, [field]: value };
    setLocalValue(updatedStatus);
  };

  const handleDropdowns = (dropdown: keyof StatusOptionsType) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <EditScreenLayout loading={loading}>
      {statusConfigs.map(({ field, title, zIndex, zIndexInverse }) => (
        <StatusDropdown
          key={field}
          field={field}
          title={title}
          value={localValue[field]}
          items={statusOptions[field]}
          openDropdown={openDropdown}
          handleDropdowns={handleDropdowns}
          updateStatus={updateStatus}
          zIndex={zIndex}
          zIndexInverse={zIndexInverse}
        />
      ))}
      <SaveCancelButtons onSave={handleSave} />
    </EditScreenLayout>
  );
};

export default EditStatus;
