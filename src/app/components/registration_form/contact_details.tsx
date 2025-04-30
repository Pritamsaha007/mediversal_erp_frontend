import { FormEvent } from "react";
import InputField from "@/app/components/ui/Input";
import Dropdown from "@/app/components/ui/Dropdown";
import { RegistrationFormData } from "@/app/types";
interface Step2Props {
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

export default function Step2({
  formData,
  isStepValid,
  onInputChange,
  onDropdownChange,
  onBlur,
  onClearFields,
  onPrevious,
  onSubmit,
}: Step2Props) {
  return (
    <form onSubmit={onSubmit} className="bg-white">
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-[#161D1F]">
          Contact Details
        </h2>

        <div className="flex flex-wrap md:flex-nowrap md:space-x-6 mb-2 justify-between">
          <InputField
            name="email"
            label="Email Address"
            placeholder="Enter Email Address"
            width="w-full md:w-[474px]"
            value={formData.email}
            onChange={onInputChange}
            onBlur={onBlur}
            type="email"
            required
            validationRules={[
              {
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            ]}
          />

          <InputField
            name="mobile_number"
            label="Mobile Number"
            placeholder="Enter Mobile Number"
            width="w-full md:w-[474px]"
            value={formData.mobile_number}
            onChange={onInputChange}
            onBlur={onBlur}
            type="tel"
            required
            validationRules={[
              {
                pattern: /^[0-9]{10}$/,
                message: "Please enter a valid 10-digit mobile number",
              },
            ]}
          />
        </div>
        <InputField
          name="patient_address"
          label="Patient Address"
          placeholder="Enter Full Address"
          width="w-full md:w-full"
          value={formData.patient_address}
          onChange={onInputChange}
          onBlur={onBlur}
          required
          validationRules={[
            {
              test: (value) => value.length >= 5,
              message: "Address should be at least 5 characters",
            },
          ]}
        />

        <div className="flex flex-wrap md:flex-nowrap md:space-x-6 mb-2 justify-between">
          <InputField
            name="pin_code"
            label="PIN Code"
            placeholder="Enter PIN Code"
            width="w-full md:w-[217px]"
            value={formData.pin_code}
            onChange={onInputChange}
            onBlur={onBlur}
            required
            validationRules={[
              {
                pattern: /^[0-9]{6}$/,
                message: "Please enter a valid 6-digit PIN code",
              },
            ]}
          />

          <InputField
            name="city"
            label="City"
            placeholder="Auto-fetched"
            width="w-full md:w-[217px]"
            value={formData.city}
            onChange={onInputChange}
            onBlur={onBlur}
          />
          <InputField
            name="state"
            label="State"
            placeholder="Auto-fetched"
            width="w-full md:w-[217px]"
            value={formData.state}
            onChange={onInputChange}
            onBlur={onBlur}
          />

          <InputField
            name="country"
            label="Country"
            placeholder="Auto-fetched"
            width="w-full md:w-[217px]"
            value={formData.country}
            onChange={onInputChange}
            onBlur={onBlur}
          />
        </div>
      </div>

      <div className="mb-8 border border-dashed border-[#0088B1] p-4 rounded-md w-full md:w-full">
        <h2 className="text-xl font-semibold mb-4 text-[#161D1F] pt-4">
          Emergency Contact
        </h2>

        <div className="flex flex-wrap md:flex-nowrap md:space-x-6 mb-2">
          <Dropdown
            name="relation_type"
            label="Relation Type"
            placeholder="Select Relation"
            width="w-full md:w-[302.67px]"
            options={[
              { value: "spouse", label: "Spouse" },
              { value: "parent", label: "Parent" },
              { value: "child", label: "Child" },
              { value: "sibling", label: "Sibling" },
              { value: "other", label: "Other" },
            ]}
            value={formData.relation_type}
            onChange={(value) => onDropdownChange("relation_type", value)}
            required
          />

          <InputField
            name="relative_name"
            label="Relative Name"
            placeholder="Enter Relative Name"
            width="w-full md:w-[302.67px]"
            value={formData.relative_name}
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

          <InputField
            name="relative_number"
            label="Relative Number"
            placeholder="Enter mobile Number"
            width="w-full md:w-[302.67px]"
            value={formData.relative_number}
            onChange={onInputChange}
            onBlur={onBlur}
            type="tel"
            required
            validationRules={[
              {
                pattern: /^[0-9]{10}$/,
                message: "Please enter a valid 10-digit mobile number",
              },
            ]}
          />
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <div className="flex flex-wrap gap-5">
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={onClearFields}
              className="text-[#0088B1] py-2 px-6 rounded-md border border-[#0088B1] outline-none hover:bg-[#0088B1] hover:text-white transition-all duration-200 text-sm"
            >
              Clear Fields
            </button>
            <h3 className="text-sm text-gray-600 text-center text-[10px]">
              <span className="font-semibold">Shift + Delete</span>
            </h3>
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              className="text-[#0088B1] py-2 px-6 rounded-md border border-[#0088B1] outline-none hover:bg-[#0088B1] hover:text-white transition-all duration-200 text-sm"
              onClick={onPrevious}
            >
              Previous Section
            </button>
            <h3 className="text-sm text-gray-600 text-center text-[10px]">
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
              } focus:outline-none focus:ring-2 focus:ring-[#0088B1] transition-all duration-200 text-sm`}
              disabled={!isStepValid}
            >
              Proceed to Next Step
            </button>
            <h3 className="text-sm text-gray-600 text-center text-[10px]">
              <span className="font-semibold">Shift + Enter</span>
            </h3>
          </div>
        </div>
      </div>
    </form>
  );
}
