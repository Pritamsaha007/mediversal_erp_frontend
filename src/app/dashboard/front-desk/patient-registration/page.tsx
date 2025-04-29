"use client";
import { useState, FormEvent, useEffect } from "react";

import Step1 from "@/app/components/registration_form/account_details";
import Step2 from "@/app/components/registration_form/contact_details";
import Step3 from "@/app/components/registration_form/billing_details";
import { RegistrationFormData } from "@/app/types";

export default function ContactForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isValidDOB, setIsValidDOB] = useState(false);

  const [formData, setFormData] = useState<RegistrationFormData>({
    id_type: "",
    id_number: "",
    salutation: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    gender: "",
    dateOfBirth: null,
    age: "",
    bloodGroup: "",
    maritalStatus: "",
    religion: "",
    caste: "",
    occupation: "",
    patient_referral: "",
    nationality: "indian",
    patientType: "general",
    patientcategory: "normal",
    email: "",
    mobile_number: "",
    patient_address: "",
    pin_code: "",
    city: "",
    state: "",
    country: "",
    relation_type: "",
    relative_name: "",
    relative_number: "",
    pan_number: "",
    pan_holder_name: "",
    pan_relation_type: "Self",
    tpa_information: "",
    insurance_company: "",
    opd_billing_category: "",
    ipd_billing_category: "",
    discount_scheme: "",
  });

  const validationRules = {
    id_number: {
      required: true,
      pattern: /^[a-zA-Z0-9]+$/,
      message: "Please enter a valid ID number",
    },
    first_name: {
      required: true,
      pattern: /^[a-zA-Z\s]+$/,
      message: "Please enter a valid first name",
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email address",
    },
    mobile_number: {
      required: true,
      pattern: /^[0-9]{10}$/,
      message: "Please enter a valid 10-digit mobile number",
    },
    relative_number: {
      required: true,
      pattern: /^[0-9]{10}$/,
      message: "Please enter a valid 10-digit mobile number",
    },
    pan_number: {
      required: true,
      pattern: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
      message: "Please enter a valid PAN number (e.g., ABCDE1234F)",
    },
  };

  const requiredFields = {
    1: [
      "id_type",
      "id_number",
      "salutation",
      "first_name",
      "gender",
      "dateOfBirth",
    ],
    2: [
      "email",
      "mobile_number",
      "patient_address",
      "pin_code",
      "relation_type",
      "relative_name",
      "relative_number",
    ],
    3: [
      "pan_number",
      "pan_holder_name",
      "pan_relation_type",
      "tpa_information",
      "insurance_company",
      "opd_billing_category",
      "ipd_billing_category",
      "discount_scheme",
    ],
  };

  useEffect(() => {
    if (formData.dateOfBirth && isValidDOB) {
      const today = new Date();
      const birthDate = new Date(formData.dateOfBirth);

      let years = today.getFullYear() - birthDate.getFullYear();
      let months = today.getMonth() - birthDate.getMonth();
      let days = today.getDate() - birthDate.getDate();

      if (days < 0) {
        months--;
        const prevMonthDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          0
        );
        days += prevMonthDate.getDate();
      }

      if (months < 0) {
        years--;
        months += 12;
      }

      setFormData((prev) => ({
        ...prev,
        age: `${years}Y/${months}M/${days}D`,
      }));
    }
  }, [formData.dateOfBirth, isValidDOB]);

  const validateField = (name: string, value: string): string => {
    if (!value || value.trim() === "") return "";
    const rule = validationRules[name as keyof typeof validationRules];

    if (rule?.required && (!value || value.trim() === "")) {
      return "This field is required";
    }

    if (value && rule?.pattern && !rule.pattern.test(value)) {
      return rule.message;
    }

    return "";
  };

  const isStepValid = (step: number): boolean => {
    const stepRequiredFields =
      requiredFields[step as keyof typeof requiredFields] || [];

    for (const field of stepRequiredFields) {
      if (field === "dateOfBirth") {
        if (!isValidDOB) return false;
        continue;
      }

      const value = formData[field as keyof typeof formData];
      if (!value || (typeof value === "string" && value.trim() === "")) {
        return false;
      }

      if (errors[field]) {
        return false;
      }
    }

    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleDropdownChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleDOBChange = (date: Date | null, valid: boolean) => {
    setFormData((prev) => ({ ...prev, dateOfBirth: date }));
    setIsValidDOB(valid);
    setTouched((prev) => ({ ...prev, dateOfBirth: true }));
    setErrors((prev) => ({
      ...prev,
      dateOfBirth: valid ? "" : "Please select a valid date of birth",
    }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const stepFields =
      requiredFields[currentStep as keyof typeof requiredFields] || [];
    const newTouched = { ...touched };
    stepFields.forEach((field) => {
      newTouched[field] = true;
    });
    setTouched(newTouched);

    const newErrors = { ...errors };
    let isValid = true;

    stepFields.forEach((field) => {
      if (field === "dateOfBirth") {
        if (!isValidDOB) {
          newErrors.dateOfBirth = "Please select a valid date of birth";
          isValid = false;
        }
        return;
      }

      const value = formData[field as keyof typeof formData] as string;
      const error = validateField(field, value);

      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);

    if (isValid) {
      if (currentStep < 3) {
        if (!completedSteps.includes(currentStep)) {
          setCompletedSteps([...completedSteps, currentStep]);
        }
        setCurrentStep(currentStep + 1);
      } else {
        console.log("Form submitted:", formData);
        setCompletedSteps([...completedSteps, currentStep]);
        alert("Patient registration successful!");
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  const handleClearFields = () => {
    const fieldsToReset: Record<string, string | null> = {};

    if (currentStep === 1) {
      fieldsToReset.id_type = "";
      fieldsToReset.id_number = "";
      fieldsToReset.salutation = "";
      fieldsToReset.first_name = "";
      fieldsToReset.middle_name = "";
      fieldsToReset.last_name = "";
      fieldsToReset.gender = "";
      fieldsToReset.dateOfBirth = null;
      fieldsToReset.age = "";
      fieldsToReset.bloodGroup = "";
      fieldsToReset.maritalStatus = "";
      fieldsToReset.religion = "";
      fieldsToReset.caste = "";
      fieldsToReset.occupation = "";
      fieldsToReset.patient_referral = "";
      setIsValidDOB(false);
    } else if (currentStep === 2) {
      fieldsToReset.email = "";
      fieldsToReset.mobile_number = "";
      fieldsToReset.patient_address = "";
      fieldsToReset.pin_code = "";
      fieldsToReset.city = "";
      fieldsToReset.state = "";
      fieldsToReset.country = "";
      fieldsToReset.relation_type = "";
      fieldsToReset.relative_name = "";
      fieldsToReset.relative_number = "";
    } else if (currentStep === 3) {
      fieldsToReset.pan_number = "";
      fieldsToReset.pan_holder_name = "";
      fieldsToReset.pan_relation_type = "";
      fieldsToReset.tpa_information = "";
      fieldsToReset.insurance_company = "";
      fieldsToReset.opd_billing_category = "";
      fieldsToReset.ipd_billing_category = "";
      fieldsToReset.discount_scheme = "";
    }

    // Reset form data
    setFormData((prev) => ({
      ...prev,
      ...Object.fromEntries(
        Object.entries(fieldsToReset).map(([key, value]) => [key, value])
      ),
    }));

    // Reset touched state for cleared fields
    const fieldNames = Object.keys(fieldsToReset);
    setTouched((prev) => {
      const newTouched = { ...prev };
      fieldNames.forEach((key) => {
        newTouched[key] = false; // Explicitly set to false instead of removing
      });
      return newTouched;
    });

    // Clear errors for cleared fields
    setErrors((prev) => {
      const newErrors = { ...prev };
      fieldNames.forEach((key) => {
        newErrors[key] = ""; // Set to empty string instead of removing
      });
      return newErrors;
    });

    // Remove current step from completed steps if it was completed
    setCompletedSteps((prev) => prev.filter((step) => step !== currentStep));
  };
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Shift+Delete for clearing fields (existing)
      if (event.shiftKey && event.key === "Delete") {
        handleClearFields();
      }

      // Shift+Backspace for previous screen
      if (event.shiftKey && event.key === "Backspace") {
        event.preventDefault();
        handlePrevious();
      }

      // Shift+Enter for next screen
      if (event.shiftKey && event.key === "Enter") {
        event.preventDefault();
        // Only proceed if current step is valid
        if (isStepValid(currentStep)) {
          handleSubmit(new Event("submit") as unknown as FormEvent);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentStep, isStepValid]);
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="flex-1 bg-white overflow-x-hidden">
        <div className="max-w-5xl mx-auto p-4 md:p-6">
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="flex items-center space-x-6 md:space-x-8">
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full ${
                    currentStep === 1 || completedSteps.includes(1)
                      ? "bg-[#0088B1] text-white"
                      : "bg-gray-200 text-gray-600"
                  } flex items-center justify-center text-sm font-medium`}
                >
                  {completedSteps.includes(1) ? "✓" : "1"}
                </div>
                <span className="ml-2 text-xs font-medium text-[#161D1F]">
                  Account Details
                </span>
              </div>

              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full ${
                    currentStep === 2 || completedSteps.includes(2)
                      ? "bg-[#0088B1] text-white"
                      : "bg-gray-200 text-gray-600"
                  } flex items-center justify-center text-sm font-medium`}
                >
                  {completedSteps.includes(2) ? "✓" : "2"}
                </div>
                <span className="ml-2 text-xs font-medium text-[#161D1F]">
                  Contact & Address Detail
                </span>
              </div>

              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full ${
                    currentStep === 3 || completedSteps.includes(3)
                      ? "bg-[#0088B1] text-white"
                      : "bg-gray-200 text-gray-600"
                  } flex items-center justify-center text-sm font-medium`}
                >
                  {completedSteps.includes(3) ? "✓" : "3"}
                </div>
                <span className="ml-2 text-xs font-medium text-[#161D1F]">
                  Billing & Financial
                </span>
              </div>
            </div>
          </div>

          {currentStep === 1 && (
            <Step1
              formData={formData}
              errors={errors}
              touched={touched}
              isValidDOB={isValidDOB}
              isStepValid={isStepValid(1)}
              onInputChange={handleChange}
              onDropdownChange={handleDropdownChange}
              onRadioChange={handleRadioChange}
              onDOBChange={handleDOBChange}
              onBlur={handleBlur}
              onClearFields={handleClearFields}
              onSubmit={handleSubmit}
            />
          )}

          {currentStep === 2 && (
            <Step2
              formData={formData}
              errors={errors}
              touched={touched}
              isStepValid={isStepValid(2)}
              onInputChange={handleChange}
              onDropdownChange={handleDropdownChange}
              onBlur={handleBlur}
              onClearFields={handleClearFields}
              onPrevious={handlePrevious}
              onSubmit={handleSubmit}
            />
          )}

          {currentStep === 3 && (
            <Step3
              formData={formData}
              errors={errors}
              touched={touched}
              isStepValid={isStepValid(3)}
              onInputChange={handleChange}
              onDropdownChange={handleDropdownChange}
              onBlur={handleBlur}
              onClearFields={handleClearFields}
              onPrevious={handlePrevious}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
}
