(() => {
    'use strict'

    // Fetch the form we want to apply custom validation styles to
    const form = document.querySelector('.needs-validation')

    if (form) {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            // Apply custom classes to trigger Tailwind's 'peer' states
            const inputs = form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                if (input.checkValidity()) {
                    input.classList.remove('is-invalid');
                    input.classList.add('is-valid');
                } else {
                    input.classList.remove('is-valid');
                    input.classList.add('is-invalid');
                }
            });

            form.classList.add('was-validated')
        }, false)
    }
})()
