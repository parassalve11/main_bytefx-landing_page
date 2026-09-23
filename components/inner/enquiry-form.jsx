'use client';

import { useId, useState } from 'react';
import Icon from '@/components/icon';
import { site } from '@/lib/content';

/* The site has no enquiry endpoint. Prepare an email without claiming delivery. */
export default function EnquiryForm({ subject, fields, submitLabel = 'Prepare email enquiry', note, title, description, consent }) {
  const id = useId();
  const [errors, setErrors] = useState({});
  const [prepared, setPrepared] = useState(null);
  const groups = [...new Set(fields.map((field) => field.group || ''))];

  function errorFor(field, input) {
    const value = input.value.trim();
    if (field.required && !value) return `Please enter ${field.label.toLowerCase()}.`;
    if (value && input.validity.typeMismatch) return field.type === 'email' ? 'Enter a valid email address.' : 'Enter a full website address, including https://.';
    if (value && field.type === 'tel' && (value.replace(/\D/g, '').length < 7 || value.replace(/\D/g, '').length > 15 || !/^[+\d\s().-]+$/.test(value))) return 'Enter a valid phone number, including your country code.';
    if (value && field.minLength && value.length < field.minLength) return `Please use at least ${field.minLength} characters.`;
    return '';
  }

  function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const nextErrors = {};
    for (const field of fields) {
      const error = errorFor(field, form.elements.namedItem(field.name));
      if (error) nextErrors[field.name] = error;
    }
    if (consent && !form.elements.namedItem('consent').checked) nextErrors.consent = 'Please agree before continuing.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setPrepared(null);
      form.elements.namedItem(Object.keys(nextErrors)[0]).focus();
      return;
    }
    const data = new FormData(form);
    const body = fields.map((field) => `${field.label}: ${String(data.get(field.name) || '').trim() || 'Not provided'}`).join('\n\n');
    const href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setPrepared({ body, href });
    window.location.href = href;
  }

  function renderField(field) {
    const fieldId = `${id}-${field.name}`;
    const props = {
      id: fieldId, name: field.name, required: field.required, placeholder: field.placeholder,
      autoComplete: field.autoComplete, maxLength: field.maxLength || (field.type === 'textarea' ? 1500 : 200),
      'aria-invalid': Boolean(errors[field.name]),
      'aria-describedby': [field.help && `${fieldId}-help`, errors[field.name] && `${fieldId}-error`].filter(Boolean).join(' ') || undefined,
      onBlur: (event) => {
        if (errors[field.name]) setErrors((current) => ({ ...current, [field.name]: errorFor(field, event.target) }));
      },
    };
    return <div key={field.name} className={`enquiry-field${field.wide ? ' is-wide' : ''}`}>
      <label htmlFor={fieldId}>{field.label}{field.required ? <span className="enquiry-required" aria-hidden="true"> *</span> : <small> (optional)</small>}</label>
      {field.type === 'textarea' ? <textarea {...props} rows={4} /> : field.type === 'select' ? <select {...props} defaultValue=""><option value="" disabled>Choose an option</option>{field.options.map((option) => <option key={option} value={option}>{option}</option>)}</select> : <input {...props} type={field.type || 'text'} />}
      {field.help && <small id={`${fieldId}-help`} className="enquiry-help">{field.help}</small>}
      {errors[field.name] && <p id={`${fieldId}-error`} className="enquiry-error">{errors[field.name]}</p>}
    </div>;
  }

  return <form className="enquiry-form" onSubmit={submit} onChange={() => setPrepared(null)} noValidate aria-label={title || subject}>
    {title && <div className="enquiry-form__heading"><h3>{title}</h3>{description && <p>{description}</p>}<span>Fields marked * are required.</span></div>}
    {groups.map((group, index) => <fieldset className="enquiry-form__group" key={group}>{group && <legend><span>0{index + 1}</span>{group}</legend>}<div className="enquiry-form__fields">{fields.filter((field) => (field.group || '') === group).map(renderField)}</div></fieldset>)}
    {consent && <div className="enquiry-consent"><label><input type="checkbox" name="consent" required aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? `${id}-consent-error` : undefined} /><span>{consent}</span></label>{errors.consent && <p className="enquiry-error" id={`${id}-consent-error`}>{errors.consent}</p>}</div>}
    <div className="enquiry-form__foot">
      <button className="btn btn--solid" type="submit">{submitLabel}<Icon name="arrow" size={15} /></button>
      <p className="inner-note">{note}</p>
    </div>
    {Object.values(errors).some(Boolean) && <p className="enquiry-error enquiry-form__status" role="alert">Please check the highlighted fields.</p>}
    {prepared && <div className="enquiry-form__status" role="status"><strong>Your email draft is ready.</strong><p>Send it from your email app to complete your enquiry. If the app did not open, <a href={prepared.href}>open the draft again</a>, or copy the details below and email <a href={`mailto:${site.email}`}>{site.email}</a>.</p><details><summary>View enquiry details</summary><pre>{prepared.body}</pre></details></div>}
  </form>;
}
