import { FormEvent } from "react";
import InputField from "@/app/components/ui/Input";
import Dropdown from "@/app/components/ui/Dropdown";
import DOBInput from "@/app/components/ui/DOBInput";
import Image from "next/image";
import ProfileDummyImage from "./assets/svgs/image-up.svg";
import { RadioBoxGroup } from "@/app/components/ui/RadioBoxGroup";
import { RegistrationFormData } from "@/app/types";
interface Step1Props {
  formData: RegistrationFormData;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isValidDOB: boolean;
  isStepValid: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDropdownChange: (name: string, value: string) => void;
  onRadioChange: (name: string, value: string) => void;
  onDOBChange: (date: Date | null, valid: boolean) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onClearFields: () => void;
  onSubmit: (e: FormEvent) => void;
}

export default function Step1({
  formData,
  isStepValid,
  onInputChange,
  onDropdownChange,
  onRadioChange,
  onDOBChange,
  onBlur,
  onClearFields,
  onSubmit,
}: Step1Props) {
  return (
    <>
      <div className="mb-8 flex flex-col md:flex-row gap-4 md:gap-8">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Patient Nationality
          </label>
          <RadioBoxGroup
            name="nationality"
            options={[
              { value: "indian", label: "Indian" },
              { value: "foreigner", label: "Foreigner" },
            ]}
            selectedValue={formData.nationality}
            onChange={onRadioChange}
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Patient Category
          </label>
          <RadioBoxGroup
            name="patientcategory"
            options={[
              { value: "normal", label: "Normal" },
              { value: "vip", label: "VIP" },
            ]}
            selectedValue={formData.patientcategory}
            onChange={onRadioChange}
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Patient Type
          </label>
          <RadioBoxGroup
            name="patientType"
            options={[
              { value: "general", label: "General" },
              { value: "government", label: "Government" },
              { value: "corporate", label: "Corporate" },
              { value: "tpa", label: "TPA" },
            ]}
            selectedValue={formData.patientType}
            onChange={onRadioChange}
          />
        </div>
      </div>

      <form onSubmit={onSubmit} className="bg-white">
        <div className="flex flex-col lg:flex-row gap-25">
          <div className="lg:w-3/4">
            <div className="flex flex-col md:flex-row md:space-x-6 mb-6">
              <Dropdown
                name="id_type"
                label="ID Type"
                placeholder="Select patient ID Type"
                options={[
                  { value: "addhar_card", label: "Addhar Card" },
                  { value: "passport", label: "Passport" },
                  { value: "pan_card", label: "Pan Card" },
                ]}
                required
                width="w-full md:w-[384.5px]"
                value={formData.id_type}
                onChange={(value) => onDropdownChange("id_type", value)}
              />

              <InputField
                name="id_number"
                label="ID Number:"
                placeholder="Enter ID Number"
                width="w-full md:w-[384.5px]"
                required
                requiredMessage="ID number is required"
                value={formData.id_number}
                onChange={onInputChange}
                onBlur={onBlur}
                validationRules={[
                  {
                    pattern: /^[a-zA-Z0-9]+$/,
                    message: "Please enter a valid ID number",
                  },
                ]}
              />
            </div>

            <div className="flex flex-col md:flex-row md:space-x-6 mb-6">
              <Dropdown
                name="salutation"
                label="Salutation:"
                placeholder="Salutation"
                options={[
                  { value: "mr", label: "Mr." },
                  { value: "mrs", label: "Mrs." },
                  { value: "ms", label: "Ms." },
                  { value: "dr", label: "Dr." },
                ]}
                required
                width="w-full md:w-[162px]"
                value={formData.salutation}
                onChange={(value) => onDropdownChange("salutation", value)}
              />

              <InputField
                name="first_name"
                label="First Name"
                placeholder="Enter First Name"
                width="w-full md:w-[283.5px]"
                required
                requiredMessage="First name is required"
                value={formData.first_name}
                onChange={onInputChange}
                onBlur={onBlur}
                validationRules={[
                  {
                    pattern: /^[a-zA-Z\s]+$/,
                    message: "Please enter a valid name",
                  },
                ]}
              />

              <InputField
                name="middle_name"
                label="Middle Name"
                placeholder="Enter Middle Name"
                width="w-full md:w-[283.5px]"
                value={formData.middle_name}
                onChange={onInputChange}
                onBlur={onBlur}
                validationRules={[
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    message: "Please enter a valid name",
                  },
                ]}
              />
            </div>
          </div>

          <div className="lg:w-1/4 flex items-center justify-center mb-6 lg:mb-0">
            <div className="h-full flex items-center justify-center">
              <Image
                src={ProfileDummyImage}
                alt="Doctor Illustration"
                width={400}
                height={200}
                className="w-full max-w-sm mx-auto"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap md:flex-nowrap md:space-x-6 mb-6">
          <InputField
            name="last_name"
            label="Last Name"
            placeholder="Enter Last Name"
            width="w-full md:w-[217px]"
            value={formData.last_name}
            onChange={onInputChange}
            onBlur={onBlur}
            validationRules={[
              {
                pattern: /^[a-zA-Z\s]*$/,
                message: "Please enter a valid name",
              },
            ]}
          />

          <Dropdown
            name="gender"
            label="Gender"
            placeholder="Select Gender"
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
            ]}
            required
            width="w-full md:w-[217px]"
            value={formData.gender}
            onChange={(value) => onDropdownChange("gender", value)}
          />

          <DOBInput
            name="dateOfBirth"
            label="Date of Birth"
            placeholder="YYYY-MM-DD"
            width="w-full md:w-[217px]"
            required={true}
            minAge={0}
            maxAge={120}
            onChange={onDOBChange}
            value={formData.dateOfBirth}
          />
          <InputField
            name="age"
            label="Age (Y/M/D):"
            placeholder="Auto-Calculated"
            width="w-full md:w-[217px]"
            value={formData.age}
            onChange={onInputChange}
            disabled={true}
          />
        </div>

        <div className="flex flex-wrap md:flex-nowrap md:space-x-6 mb-6">
          <Dropdown
            name="bloodGroup"
            label="Blood Group:"
            placeholder="Select Blood Group"
            width="w-full md:w-[302.67px]"
            options={[
              { value: "a_pos", label: "A+" },
              { value: "a_neg", label: "A-" },
              { value: "b_pos", label: "B+" },
              { value: "b_neg", label: "B-" },
              { value: "ab_pos", label: "AB+" },
              { value: "ab_neg", label: "AB-" },
              { value: "o_pos", label: "O+" },
              { value: "o_neg", label: "O-" },
            ]}
            value={formData.bloodGroup}
            onChange={(value) => onDropdownChange("bloodGroup", value)}
          />

          <Dropdown
            name="maritalStatus"
            label="Marital Status:"
            placeholder="Select Marital Status"
            width="w-full md:w-[302.67px]"
            options={[
              { value: "single", label: "Single" },
              { value: "married", label: "Married" },
              { value: "divorced", label: "Divorced" },
              { value: "widowed", label: "Widowed" },
            ]}
            value={formData.maritalStatus}
            onChange={(value) => onDropdownChange("maritalStatus", value)}
          />
          <InputField
            name="religion"
            label="Religion"
            placeholder="Optional"
            width="w-full md:w-[302.67px]"
            value={formData.religion}
            onChange={onInputChange}
            onBlur={onBlur}
          />
        </div>

        <div className="flex flex-wrap md:flex-nowrap md:space-x-6 mb-6">
          <InputField
            name="caste"
            label="Caste"
            placeholder="Optional"
            width="w-full md:w-[302.67px]"
            value={formData.caste}
            onChange={onInputChange}
            onBlur={onBlur}
          />
          <InputField
            name="occupation"
            label="Occupation"
            placeholder="Enter patient occupation"
            width="w-full md:w-[302.67px]"
            value={formData.occupation}
            onChange={onInputChange}
            onBlur={onBlur}
          />
          <Dropdown
            name="patient_referral"
            label="Patient Referral:"
            placeholder="Select referral source"
            width="w-full md:w-[302.67px]"
            options={[
              { value: "physician", label: "Physician" },
              { value: "friend", label: "Friend/Family" },
              { value: "website", label: "Website" },
              { value: "other", label: "Other" },
            ]}
            value={formData.patient_referral}
            onChange={(value) => onDropdownChange("patient_referral", value)}
          />
        </div>

        <div className="flex justify-end mt-6 gap-5">
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
              type="submit"
              className={`py-2 px-6 rounded-md ${
                isStepValid
                  ? "bg-[#0088B1] text-white hover:bg-[#0077A0]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              } focus:outline-none focus:ring-2 focus:ring-[#0088B1]`}
              disabled={!isStepValid}
            >
              Proceed to Next Step
            </button>
            <h3 className="text-sm text-gray-600 text-center">
              <span className="font-semibold">Shift + Enter</span>
            </h3>
          </div>
        </div>
      </form>
    </>
  );
}
