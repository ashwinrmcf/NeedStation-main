import { useEffect } from "react";

const useBasicNeedsLogic = () => {
  useEffect(() => {
    // Scroll Animations
    const observeElement = (element, callback, threshold = 0.06) => {
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                callback(entry.target);
                observer.unobserve(entry.target); // Stop observing once it's visible
              }
            });
          },
          { threshold }
        );

        observer.observe(element);
      }
    };

    const addVisibleClass = (element) => {
      element.classList.add("visible"); // 'visible' class will trigger CSS animations
    };

    // Elements to observe
    const scrollBox = document.getElementById("scrollBox");
    const scrollBox2 = document.getElementById("scrollBox2");
    const steps = document.getElementById("steps");

    observeElement(scrollBox, addVisibleClass);
    observeElement(scrollBox2, addVisibleClass);
    observeElement(steps, addVisibleClass);

    // Popup Modal Functionality
    const buttonn = document.getElementById("buttonn"); // "Book Now" button
    const container3 = document.getElementById("container3"); // Popup container
    const closePopup = document.getElementById("closePopup"); // Close button in popup

    if (buttonn && container3 && closePopup) {
      // Show popup on button click
      buttonn.addEventListener("click", () => {
        container3.style.display = "flex";
      });

      // Hide popup on close button click
      closePopup.addEventListener("click", () => {
        container3.style.display = "none";
      });

      // Hide popup when clicking outside the popup content
      const hideOnOutsideClick = (event) => {
        if (event.target === container3) {
          container3.style.display = "none";
        }
      };

      window.addEventListener("click", hideOnOutsideClick);

      // Cleanup event listeners
      return () => {
        buttonn.removeEventListener("click", () => {});
        closePopup.removeEventListener("click", () => {});
        window.removeEventListener("click", hideOnOutsideClick);
      };
    } else {
      console.error("One or more elements are missing in the HTML.");
    }
  }, []);
};

export default useBasicNeedsLogic;
