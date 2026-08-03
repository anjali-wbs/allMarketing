document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('expert-contact-form');
    if (!contactForm) return;

    // Disable browser default validation tooltips
    contactForm.setAttribute('novalidate', 'true');

    const fields = [
        {
            id: 'form-name',
            validate: (val) => {
                if (!val.trim()) return 'Please enter your name.';
                if (val.trim().length < 2) return 'Name must be at least 2 characters.';
                return '';
            }
        },
        {
            id: 'form-email',
            validate: (val) => {
                if (!val.trim()) return 'Please enter your email address.';
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(val.trim())) return 'Please enter a valid email address.';
                return '';
            }
        },
        {
            id: 'form-phone',
            validate: (val) => {
                if (!val.trim()) return 'Please enter your phone number.';
                const phoneRegex = /^[\d\s\-\+\(\)]{7,20}$/;
                if (!phoneRegex.test(val.trim())) return 'Please enter a valid phone number.';
                return '';
            }
        },
        {
            id: 'form-message',
            validate: (val) => {
                if (!val.trim()) return 'Please enter your message.';
                if (val.trim().length < 10) return 'Message must be at least 10 characters.';
                return '';
            }
        }
    ];

    // Show inline error below a field
    function showError(fieldId, message) {
        const input = document.getElementById(fieldId);
        if (!input) return;
        input.classList.add('input-error');
        input.classList.remove('input-valid');

        // Remove existing error if any
        const existing = input.parentElement.querySelector('.inline-error');
        if (existing) existing.remove();

        // Create error element
        const errorEl = document.createElement('span');
        errorEl.className = 'inline-error';
        errorEl.textContent = message;
        input.parentElement.appendChild(errorEl);
    }

    // Clear error from a field
    function clearError(fieldId) {
        const input = document.getElementById(fieldId);
        if (!input) return;
        input.classList.remove('input-error');
        input.classList.add('input-valid');

        const existing = input.parentElement.querySelector('.inline-error');
        if (existing) existing.remove();
    }

    // Reset field to neutral (no error, no valid)
    function resetField(fieldId) {
        const input = document.getElementById(fieldId);
        if (!input) return;
        input.classList.remove('input-error', 'input-valid');

        const existing = input.parentElement.querySelector('.inline-error');
        if (existing) existing.remove();
    }

    // Validate a single field and show/clear error
    function validateField(fieldConfig) {
        const input = document.getElementById(fieldConfig.id);
        if (!input) return true;
        const error = fieldConfig.validate(input.value);
        if (error) {
            showError(fieldConfig.id, error);
            return false;
        } else {
            clearError(fieldConfig.id);
            return true;
        }
    }

    // Real-time validation on blur
    fields.forEach(fieldConfig => {
        const input = document.getElementById(fieldConfig.id);
        if (!input) return;

        input.addEventListener('blur', () => {
            if (input.value.trim()) {
                validateField(fieldConfig);
            }
        });

        // Clear error as user types (if previously had error)
        input.addEventListener('input', () => {
            if (input.classList.contains('input-error')) {
                const error = fieldConfig.validate(input.value);
                if (!error) {
                    clearError(fieldConfig.id);
                }
            }
        });
    });

    // Submit handler
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;

        fields.forEach(fieldConfig => {
            const valid = validateField(fieldConfig);
            if (!valid) isValid = false;
        });

        if (!isValid) {
            // Focus the first field with error
            const firstError = contactForm.querySelector('.input-error');
            if (firstError) firstError.focus();
            return;
        }

        const name = document.getElementById('form-name').value.trim();
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalBtnText = submitBtn ? submitBtn.textContent : 'SUBMIT';

        // Set loading state
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'SENDING...';
        }

        // Get Form Data
        const formData = new FormData(contactForm);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        // Submit to Web3Forms
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            const resData = await response.json();
            if (response.status === 200) {
                // Center the "GET FREE CONSULTATION" heading if it exists
                const heading = contactForm.parentElement.querySelector('h4');
                if (heading) {
                    heading.style.textAlign = 'center';
                    heading.style.marginBottom = '1rem';
                }

                // Success State Animation
                contactForm.innerHTML = `
                    <div style="text-align: center; padding: 2rem 1rem;">
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#29c4a9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 1.5rem; animation: scaleUp 0.5s ease-out;">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                            <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                        <h3 style="color: #2d3940; margin-bottom: 1rem;">Thank You, ${name}!</h3>
                        <p style="color: #4e4e4e; font-size: 1.05rem; line-height: 1.6; margin-bottom: 1.5rem;">Your consultation request has been sent successfully. One of our advisors will call you shortly at the phone number or email provided.</p>
                        <p style="color: #01bfd2; font-size: 0.95rem; font-weight: 600;">We look forward to helping you grow your business!</p>
                    </div>
                `;
            } else {
                console.error(resData);
                alert(resData.message || 'Something went wrong. Please try again.');
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                }
            }
        })
        .catch(error => {
            console.error('Error submitting form:', error);
            alert('There was a network error. Please try again.');
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        });
    });
});
