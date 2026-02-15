# 🎯 Habit Tracker

A beautiful, modern habit tracker built with vanilla HTML, CSS, and JavaScript. Track your daily habits, build streaks, and visualize your progress—all stored locally in your browser.

## ✨ Features

- **Add Custom Habits** - Create unlimited habits to track
- **Daily Check-ins** - Mark habits as complete each day
- **Streak Tracking** - Monitor your current streak and longest streak
- **Total Completions** - See how many times you've completed each habit
- **Local Storage** - All data persists in your browser (no backend needed)
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Modern UI** - Smooth animations and gradient design
- **Zero Dependencies** - Pure vanilla JavaScript, no frameworks

## 🚀 Demo

Simply open the `habit-tracker.html` file in any modern web browser to start using it immediately!

## 📸 Screenshots

<img width="1663" height="891" alt="image" src="https://github.com/user-attachments/assets/33514f76-4a39-44eb-a9dc-d1c8b36d6fe9" />

<img width="1532" height="854" alt="image" src="https://github.com/user-attachments/assets/575f140e-478a-4a0e-a672-a4acbd0bc7de" />


## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients, flexbox, and animations
- **JavaScript (ES6+)** - Vanilla JS with localStorage API
- **LocalStorage API** - Client-side data persistence

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/habit-tracker.git
```

2. Navigate to the project directory:
```bash
cd habit-tracker
```

3. Open `habit-tracker.html` in your browser:
```bash
# On macOS
open habit-tracker.html

# On Linux
xdg-open habit-tracker.html

# On Windows
start habit-tracker.html
```

Or simply double-click the `habit-tracker.html` file!

## 💡 Usage

1. **Add a Habit**: Type your habit name in the input field and click "Add Habit"
2. **Complete a Habit**: Click the checkbox next to a habit to mark it complete for today
3. **Track Progress**: View your current streak, longest streak, and total completions
4. **Delete a Habit**: Click the "Delete" button to remove a habit (with confirmation)

## 🎨 Features Breakdown

### Streak Calculation
- **Current Streak**: Consecutive days you've completed the habit (including today)
- **Longest Streak**: Your best streak ever for this habit
- **Total Completions**: Lifetime count of how many times you've completed the habit

### Data Persistence
All your habits and completion data are stored in your browser's localStorage, so your progress is saved even after closing the browser.

### Responsive Design
The layout adapts beautifully to different screen sizes:
- Desktop: Full-featured layout with side-by-side elements
- Tablet: Optimized spacing and layout
- Mobile: Stacked layout for easy thumb navigation

## 🔧 Customization

### Change Colors
Edit the CSS variables in the `<style>` section:
```css
/* Primary gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Accent color */
border-color: #667eea;
```

### Modify Animations
Adjust animation timing and effects in the CSS:
```css
@keyframes slideIn {
    /* Customize animation here */
}
```

## 📱 Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Opera (latest)

**Note**: Requires localStorage support (available in all modern browsers)

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Roadmap

Future enhancements:
- [ ] Weekly/monthly view calendar
- [ ] Export data to CSV/JSON
- [ ] Dark mode toggle
- [ ] Habit categories/tags
- [ ] Progress charts and statistics
- [ ] Habit reminders (with notifications API)
- [ ] Import/export functionality
- [ ] Multi-device sync (with optional backend)

## 👨‍💻 Author

Ritvik Ganga

Project Link: [https://github.com/yourusername/habit-tracker](https://github.com/ritvik-6/Habit-Tracker-Pro)

## 🙏 Acknowledgments

- Inspired by habit tracking apps like Habitica and Streaks
- Gradient colors from [uiGradients](https://uigradients.com/)
- Icons from Unicode emoji set

---

⭐ If you find this project useful, please consider giving it a star on GitHub!
