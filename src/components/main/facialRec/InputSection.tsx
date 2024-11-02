// InputSection.tsx
import React, { useState } from 'react';
import logo from '../../../assets/icons/logo.png';
import { dict } from '../../../lib/dict';
import { useLanguage } from '../../../context/LanguageContext';
import CustomDropdown from '../../ui/SelectDropDown';
import { Member } from '../../../lib/types';
import CustomFileInput from '../../ui/CustomFileInput';
import CustomInput from '../../ui/CustomInput';

interface Option {
  value: string;
  label: string;
}

interface Errors {
  nameError: boolean;
  ageError: boolean;
  genderError: boolean;
  emailError: boolean;
  phoneError: boolean;
  subscriptionError: boolean;
  paymentError: boolean;
}

interface InputSectionProps {
  onCreateMember: (memberData: Partial<Member>) => void;
  isProcessing: boolean;
  setIsProcessing: (value: boolean) => void;
}

const InputSection: React.FC<InputSectionProps> = ({ onCreateMember, isProcessing, setIsProcessing }) => {
  const selectedLanguage = useLanguage();
  const [personName, setPersonName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [subscriptionType, setSubscriptionType] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [paymentValue, setPaymentValue] = useState<string>();
  const [errors, setErrors] = useState<Errors>({
    nameError: false,
    ageError: false,
    genderError: false,
    emailError: false,
    phoneError: false,
    subscriptionError: false,
    paymentError: false,
  });

  // Function to sanitize and validate inputs
  const sanitizeAndValidateAge = (ageInput: string): { sanitized: string; isValid: boolean } => {
    const sanitized = ageInput.trim();
    const isValid = /^\d+$/.test(sanitized) && Number(sanitized) > 0;
    return { sanitized, isValid };
  };

  const subscriptionOptions: Option[] = [
    { value: 'monthly', label: dict[selectedLanguage].monthly },
    { value: 'yearly', label: dict[selectedLanguage].yearly },
  ];

  const genderOptions: Option[] = [
    { value: 'male', label: dict[selectedLanguage].male },
    { value: 'female', label: dict[selectedLanguage].female },
  ];

  const handleAddMember = async () => {
    // Reset errors
    setErrors({
      nameError: false,
      ageError: false,
      genderError: false,
      emailError: false,
      phoneError: false,
      subscriptionError: false,
      paymentError: false,
    });

    let hasError = false;

    // Sanitize and validate inputs
    const sanitizedName = personName.trim();
    const { sanitized: sanitizedAge, isValid: ageIsValid } = sanitizeAndValidateAge(age);
    const sanitizedEmail = email.trim();
    const sanitizedPhone = phone.trim();

    // Validate inputs
    if (!sanitizedName) {
      setErrors(prev => ({ ...prev, nameError: true }));
      hasError = true;
      return;
    }
    if (!ageIsValid) {
      setErrors(prev => ({ ...prev, ageError: true }));
      hasError = true;
      return;
    }
    if (!gender) {
      setErrors(prev => ({ ...prev, genderError: true }));
      hasError = true;
      return;
    }

    if (!subscriptionType) {
      setErrors(prev => ({ ...prev, subscriptionError: true }));
      hasError = true;
      return;
    }

    if (hasError) return;

    setIsProcessing(true);
    const memberData: Partial<Member> = {
      name: sanitizedName,
      age: sanitizedAge,
      gender: gender,
      email: sanitizedEmail,
      phone: sanitizedPhone,
      subscriptionType: subscriptionType,
      lastPaymentValue: parseInt(paymentValue!, 10),
      image: selectedFile,
    };

    onCreateMember(memberData);
  };

  return (
    <div
      className={`flex flex-col lg:w-4/12 p-4 scrollbar-hide bg-light-surface dark:bg-dark-surface rounded-t-xl lg:rounded-l-xl shadow-lg space-y-4 lg:space-y-6 max-h-full overflow-auto`}
    >
      <div className="flex items-center justify-center space-x-2">
        <img src={logo} alt="GymPro Logo" className="h-8 w-8" />
        <span className="text-xl font-f2 text-light-text-primary dark:text-dark-text-primary">
          {dict[selectedLanguage].logo}
        </span>
      </div>

      <div className="flex flex-col justify-center space-y-4 ">
        <CustomInput
          type="text"
          placeholder={dict[selectedLanguage].namePlaceholder}
          value={personName}
          onChange={value => setPersonName(value || '')} // Adjusted to handle string | undefined
          error={errors.nameError ? dict[selectedLanguage].nameRequired : undefined}
        />

        <CustomInput
          type="number"
          placeholder={dict[selectedLanguage].agePlaceholder}
          value={age}
          onChange={value => setAge(value || '')} // Adjusted to handle string | undefined
          error={errors.ageError ? dict[selectedLanguage].validAge : undefined}
        />

        <CustomDropdown
          options={genderOptions}
          value={gender}
          onChange={setGender}
          placeholder={dict[selectedLanguage].genderPlaceholder}
          className={`border border-gray-300 dark:border-gray-600 rounded-md ${errors.genderError ? 'border-red-500' : 'border-gray-300'}`}
          bgColor="bg-gray-100 dark:bg-gray-700"
          borderColor="bg-white"
        />
        {errors.genderError && <span className="text-red-500 text-sm">{dict[selectedLanguage].genderRequired}</span>}

        <CustomInput
          type="email"
          placeholder={dict[selectedLanguage].emailPlaceholder}
          value={email}
          onChange={value => setEmail(value || '')} // Adjusted to handle string | undefined
          error={errors.emailError ? dict[selectedLanguage].validEmail : undefined}
        />

        <CustomInput
          type="text"
          placeholder={dict[selectedLanguage].phonePlaceholder}
          value={phone}
          onChange={value => setPhone(value || '')} // Adjusted to handle string | undefined
          error={errors.phoneError ? dict[selectedLanguage].phoneRequired : undefined}
        />

        <CustomDropdown
          options={subscriptionOptions}
          value={subscriptionType}
          onChange={setSubscriptionType}
          placeholder={dict[selectedLanguage].subscriptionTypePlaceholder}
          className={`border border-gray-300 dark:border-gray-600 rounded-md ${errors.subscriptionError ? 'border-red-500' : 'border-gray-300'}`}
          bgColor="bg-gray-100 dark:bg-gray-700"
          borderColor="bg-white"
        />
        {errors.subscriptionError && (
          <span className="text-red-500">{dict[selectedLanguage].subscriptionRequired}</span>
        )}

        <CustomInput
          type="number"
          placeholder={dict[selectedLanguage].paymentValue}
          value={paymentValue}
          onChange={value => setPaymentValue(value || '')} // Adjusted to handle string | undefined
          error={errors.paymentError ? dict[selectedLanguage].paymentRequired : undefined}
        />

        <CustomFileInput
          onFileChange={setSelectedFile}
          className={`bg-gray-100 dark:bg-gray-700 rounded-md border-none`}
        />

        <button
          onClick={handleAddMember}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          disabled={isProcessing}
        >
          {isProcessing ? dict[selectedLanguage].processing : dict[selectedLanguage].addMember}
        </button>
      </div>
    </div>
  );
};

export default InputSection;
