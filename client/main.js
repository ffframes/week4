const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('http://localhost:3000/submit-guestbook', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert('Message posted! Refresh to see it.');
            form.reset();
        }
    } catch (error) {
        console.error('Error:', error);
    }
});