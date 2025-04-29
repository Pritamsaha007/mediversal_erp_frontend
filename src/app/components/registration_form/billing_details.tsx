import { FormEvent } from "react";
import InputField from "@/app/components/ui/Input";
import Dropdown from "@/app/components/ui/Dropdown";
import { RegistrationFormData } from "@/app/types";
import ImageUploader from "@/app/components/ui/ImageUpload";
import MultiImageUploader from "@/app/components/ui/MultiImageUplaod";

interface Step3Props {
  formData: RegistrationFormData;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isStepValid: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDropdownChange: (name: string, value: string) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onClearFields: () => void;
  onPrevious: () => void;
  onSubmit: (e: FormEvent) => void;
}

const SectionHeader = ({ title }: { title: string }) => (
  <div className="text-lg font-medium text-gray-800 mb-4 pb-2 w-full">
    {title}
  </div>
);

export default function Step3({
  formData,
  isStepValid,
  onInputChange,
  onDropdownChange,
  onBlur,
  onClearFields,
  onPrevious,
  onSubmit,
}: Step3Props) {
  const handleMultipleFilesSelected = (files: File[]) => {
    console.log("Selected files:", files);
  };

  return (
    <form onSubmit={onSubmit} className="bg-white p-6">
      <SectionHeader title="PAN Card Details" />
      <div className="flex flex-wrap md:flex-nowrap md:space-x-6 mb-6">
        <InputField
          name="pan_number"
          label="PAN Number"
          placeholder="Enter Pan number"
          width="w-full md:w-[240px]"
          value={formData.pan_number}
          onChange={onInputChange}
          onBlur={onBlur}
          required
          validationRules={[
            {
              pattern: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
              message: "Please enter a valid PAN number (e.g., ABCDE1234F)",
            },
          ]}
        />

        <InputField
          name="pan_holder_name"
          label="PAN Holder Name"
          placeholder="Enter Pan Holder Name"
          width="w-full md:w-[320px]"
          value={formData.pan_holder_name}
          onChange={onInputChange}
          onBlur={onBlur}
          required
          validationRules={[
            {
              pattern: /^[a-zA-Z\s]+$/,
              message: "Please enter a valid name",
            },
          ]}
        />

        <Dropdown
          name="pan_relation_type"
          label="PAN Belongs To"
          placeholder="Self"
          width="w-full md:w-[160px]"
          options={[
            { value: "spouse", label: "Spouse" },
            { value: "parent", label: "Parent" },
            { value: "child", label: "Child" },
            { value: "sibling", label: "Sibling" },
            { value: "self", label: "Self" },
          ]}
          value={formData.pan_relation_type}
          onChange={(value) => onDropdownChange("pan_relation_type", value)}
          required
        />

        <ImageUploader
          width="w-full md:w-[148px]"
          labelText="Upload Pan"
          onFileSelected={(file) => {
            console.log("Selected file:", file);
          }}
          maxFileSizeMB={2}
        />
      </div>

      <SectionHeader title="Insurance Details" />
      <div className="flex flex-wrap md:flex-nowrap md:space-x-6 mb-6">
        <InputField
          name="tpa_information"
          label="TPA/Corporate Information"
          placeholder="Enter Corporate Information"
          width="w-full md:w-[440px]"
          value={formData.tpa_information}
          onChange={onInputChange}
          onBlur={onBlur}
          required
        />

        <Dropdown
          name="insurance_company"
          label="Insurance Company"
          placeholder="Select Company"
          width="w-full md:w-[320px]"
          options={[
            { value: "company1", label: "Company 1" },
            { value: "company2", label: "Company 2" },
            { value: "company3", label: "Company 3" },
            { value: "company4", label: "Company 4" },
          ]}
          value={formData.insurance_company}
          onChange={(value) => onDropdownChange("insurance_company", value)}
          required
        />

        <ImageUploader
          width="w-full md:w-[148px]"
          labelText="Upload Medical Card"
          onFileSelected={(file) => {
            console.log("Selected file:", file);
          }}
          maxFileSizeMB={2}
        />
      </div>

      {/* Billing Categories Section */}
      <SectionHeader title="Billing Categories" />
      <div className="flex flex-wrap md:flex-nowrap md:space-x-6 mb-6">
        <Dropdown
          name="opd_billing_category"
          label="OPD Billing Category"
          placeholder="Select Category"
          width="w-full md:w-[302px]"
          options={[
            { value: "company1", label: "Company 1" },
            { value: "company2", label: "Company 2" },
            { value: "company3", label: "Company 3" },
            { value: "company4", label: "Company 4" },
          ]}
          value={formData.opd_billing_category}
          onChange={(value) => onDropdownChange("opd_billing_category", value)}
          required
        />

        <Dropdown
          name="ipd_billing_category"
          label="IPD Billing Category"
          placeholder="Select Category"
          width="w-full md:w-[302px]"
          options={[
            { value: "company1", label: "Company 1" },
            { value: "company2", label: "Company 2" },
            { value: "company3", label: "Company 3" },
            { value: "company4", label: "Company 4" },
          ]}
          value={formData.ipd_billing_category}
          onChange={(value) => onDropdownChange("ipd_billing_category", value)}
          required
        />

        <Dropdown
          name="discount_scheme"
          label="Discount Scheme"
          placeholder="Select Category"
          width="w-full md:w-[302px]"
          options={[
            { value: "company1", label: "Company 1" },
            { value: "company2", label: "Company 2" },
            { value: "company3", label: "Company 3" },
            { value: "company4", label: "Company 4" },
          ]}
          value={formData.discount_scheme}
          onChange={(value) => onDropdownChange("discount_scheme", value)}
          required
        />
      </div>

      <SectionHeader title="Additional Documents" />
      <div className="mb-6">
        <MultiImageUploader
          width="w-[988px]"
          labelText="Upload Additional Documents"
          buttonText="Choose Files"
          onFilesSelected={handleMultipleFilesSelected}
          maxFileSizeMB={2}
          maxFiles={5}
        />
      </div>

      <div className="flex justify-end mt-6">
        <div className="flex flex-wrap gap-5">
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={onClearFields}
              className="text-[#0088B1] py-2 px-6 rounded-md border border-[#0088B1] outline-none hover:bg-[#0088B1] hover:text-white transition-all duration-200"
            >
              Clear Fields
            </button>
            <h3 className="text-sm text-gray-600 text-center">
              <span className="font-semibold">Shift + Delete</span>
            </h3>
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              className="text-[#0088B1] py-2 px-6 rounded-md border border-[#0088B1] outline-none hover:bg-[#0088B1] hover:text-white transition-all duration-200"
              onClick={onPrevious}
            >
              Previous Section
            </button>
            <h3 className="text-sm text-gray-600 text-center">
              <span className="font-semibold">Shift + Backspace</span>
            </h3>
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className={`py-2 px-6 rounded-md ${
                isStepValid
                  ? "bg-[#0088B1] text-white hover:bg-[#0077A0]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              } focus:outline-none focus:ring-2 focus:ring-[#0088B1] transition-all duration-200`}
              disabled={!isStepValid}
            >
              Register Patient
            </button>
            <h3 className="text-sm text-gray-600 text-center">
              <span className="font-semibold">Shift + Enter</span>
            </h3>
          </div>
        </div>
      </div>
    </form>
  );
}
