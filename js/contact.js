document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('expert-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('form-name').value.strip ? document.getElementById('form-name').value.trim() : document.getElementById('form-name').value;
            const email = document.getElementById('form-email').value;
            const message = document.getElementById('form-message').value;
            
            if (!name || !email || !message) {
                alert('Please fill out all required fields.');
                return;
            }
            
            // Success State Animation
            contactForm.innerHTML = `
                <div style="text-align: center; padding: 3rem 1rem;">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#29c4a9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 1.5rem; animation: scaleUp 0.5s ease-out;">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    <h3 style="color: #2d3940; margin-bottom: 1rem;">Thank You, ${name}!</h3>
                    <p style="color: #4e4e4e; font-size: 1.05rem; line-height: 1.6;">Your consultation request has been sent successfully. One of our advisors will call you shortly at the phone number or email provided.</p>
                </div>
            `;
        });
    }
});
