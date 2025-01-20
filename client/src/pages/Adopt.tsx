import { useRef, useEffect, useState } from 'react';
import adopt from '../assets/images/adopt.png';
import counsel from '../assets/images/counsel.png';
import checks from '../assets/images/checks.png';
import pets from '../assets/images/pets.png';
import home from '../assets/images/home.png';

const Adopt = () => {
  // TODO switch to ref instead of querySelector
  const sectionsRef = useRef<HTMLElement[]>([]);
  // Track which sections have been animated
  const [animatedSections, setAnimatedSections] = useState<Set<number>>(
    new Set(),
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const section = entry.target as HTMLElement;
          const sectionIndex = sectionsRef.current.indexOf(section);

          if (entry.isIntersecting) {
            const slideInElement = section.querySelector('.slide-right');
            const slideElement = section.querySelector('.slide-left');

            if (slideInElement) {
              slideInElement.classList.add('slide-in');
            }
            if (slideElement) {
              slideElement.classList.add('slide');
            }

            setAnimatedSections((prev) => new Set(prev).add(sectionIndex));
          } else {
            // Section is leaving view
            // Only remove classes if the section was previously animated
            if (animatedSections.has(sectionIndex)) {
              const slideInElement = section.querySelector('.slide-right');
              const slideElement = section.querySelector('.slide-left');

              if (slideInElement) {
                slideInElement.classList.remove('slide-in');
              }
              if (slideElement) {
                slideElement.classList.remove('slide');
              }

              setAnimatedSections((prev) => {
                const next = new Set(prev);
                next.delete(sectionIndex);
                return next;
              });
            }
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px',
      },
    );

    sectionsRef.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, [animatedSections]);

  return (
    <div className='mx-auto overflow-hidden px-4 sm:px-10 lg:px-12'>
      <h2 className='font-cuteCat text-6xl md:text-7xl lg:text-8xl text-center font-bold mt-3 pt-2 mb-2'>
        Adoption Process
      </h2>
      <p className='mb-3 mt-6 text-xl'>
        Are you looking to welcome a new four-legged friend into your family? We
        have adoptable puppies, dogs, cats and kittens looking for forever
        homes. Our adoption process is quick and easy, and it's tailored to find
        a great fit for your family. You don't even have to specify a particular
        animal when beginning the process – we are here to help.
      </p>
      <p className='mb-16 mt-4 text-xl'>
        If you are interested in a specific animal, please be sure to list their
        names on your questionnaire. If you can’t find their name, don’t worry:
        simply write in the notes who you might be interested in. You can write
        multiple animals into a single application; no need to apply multiple
        times. Please note that submitting a questionnaire is the first step in
        our process and does not guarantee adoption of a particular dog or cat.
        Contact us if you have any questions.
      </p>

      <div className='px-4 md:px-8 lg:px-10'>
        {/* Section 1 */}
        <section
          ref={(el) => {
            if (el) sectionsRef.current[0] = el;
          }}
          className='flex flex-1 flex-wrap justify-around items-center my-10'
        >
          <div className='basis-full md:basis-1/4 flex justify-center slide-right w-1/2'>
            <img
              src={adopt}
              height='200px'
              width='200px'
              alt='cartoon of hands typing on a laptop'
            />
          </div>
          <div className='basis-full md:basis-3/4 pl-4 slide-left w-1/2'>
            <h2 className='font-cuteCat text-4xl md:text-5xl lg:text-6xl text-center font-bold mt-3 pt-2 mb-2'>
              Step 1
            </h2>
            <h3 className='font-cuteCat text-2xl md:text-3xl lg:text-4xl text-center font-bold mt-3 pt-2 mb-2'>
              Fill out the Adoption Questionnaire
            </h3>
            <p className='text-lg'>
              Complete a Dog or Cat Adoption Questionnaire. If you are
              interested in applying for a specific animal on the website,
              please be sure to list their names on your questionnaire. If you
              cannot select an animal please still submit your questionnaire and
              write in the notes who you might be interested in. You only need
              to apply once and we will ensure it is directed to the right
              person. Please note that submitting an application is the first
              step in our process and does not guarantee adoption of a
              particular dog or cat. Contact us if you have any questions.
              {/* TODO link to contact */}
            </p>
            <button className='flex w-30 mx-auto mt-5 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
              Adoption Questionnaire
            </button>
          </div>
        </section>

        {/* Section 2 */}

        <section
          ref={(el) => {
            if (el) sectionsRef.current[1] = el;
          }}
          className='flex flex-1 flex-wrap-reverse justify-around items-center my-10'
        >
          <div className='basis-full md:basis-3/4 slide-right w-1/2'>
            <h2 className='font-cuteCat text-4xl md:text-5xl lg:text-6xl text-center font-bold mt-3 pt-2 mb-2'>
              Step 2
            </h2>
            <h3 className='font-cuteCat text-2xl md:text-3xl lg:text-4xl text-center font-bold mt-3 pt-2 mb-2'>
              Adoption Counseling
            </h3>
            <p className='text-lg'>
              You will be contacted via email by a Volunteer Pawsome Pets
              Adoption Counselor. They will schedule an initial phone screening
              to further discuss your needs, preferences and lifestyle as you
              look for a new family member. Our goal is to ensure a good fit and
              guide you along your journey to pet adoption.
            </p>
          </div>
          <div className='basis-full md:basis-1/4 flex justify-center pl-4 slide-left w-1/2 '>
            <img
              src={counsel}
              height='200px'
              width='200px'
              alt='cartoon of zoom chat with counselor'
            />
          </div>
        </section>

        {/* Section 3 */}
        <section
          ref={(el) => {
            if (el) sectionsRef.current[2] = el;
          }}
          className='flex flex-1 flex-wrap justify-around items-center my-10'
        >
          <div className='basis-full md:basis-1/4 slide-right flex justify-center'>
            <img
              src={checks}
              height='200px'
              width='200px'
              alt='cartoon large green apartment building'
            />
          </div>
          <div className='basis-full md:basis-3/4 pl-4 slide-left w-1/2 '>
            <h2 className='font-cuteCat text-4xl md:text-5xl lg:text-6xl text-center font-bold mt-3 pt-2 mb-2'>
              Step 3
            </h2>
            <h3 className='font-cuteCat text-2xl md:text-3xl lg:text-4xl text-center font-bold mt-3 pt-2 mb-2'>
              Checks
            </h3>
            <p className='text-lg'>
              Your Adoption Counselor will also conduct any required checks,
              including a vet check to ensure your pets are up to date on
              medical needs. We will also complete a landlord check if you rent.
              This ensures your new family member will be a welcome addition to
              your home.
            </p>
          </div>
        </section>

        {/* Section 4 */}

        <section
          ref={(el) => {
            if (el) sectionsRef.current[3] = el;
          }}
          className='flex flex-1 flex-wrap-reverse justify-around items-center my-10'
        >
          <div className='basis-full md:basis-3/4 slide-right'>
            <h2 className='font-cuteCat text-4xl md:text-5xl lg:text-6xl text-center font-bold mt-3 pt-2 mb-2'>
              Step 4
            </h2>
            <h3 className='font-cuteCat text-2xl md:text-3xl lg:text-4xl text-center font-bold mt-3 pt-2 mb-2'>
              Find Your Family Member
            </h3>
            <p className='text-lg'>
              Following steps 1-3, you will either be approved to adopt the dog
              or cat you are interested in or pre-approved and matched with some
              animals from which to choose. You can view the list of current
              animals online, attend one of our weekly Adoption Events to meet
              our pets, or you can work with your Adoption Counselor to set up a
              meeting at a convenient time. If we don’t have the breed or size
              you are looking for, we can work with our shelter partners to find
              one. If you are having trouble finding the right fit - ask your
              Counselor about Matchmaking. We have many puppies, dogs, cats and
              kittens looking for homes and our volunteers will help you find
              the best match.
            </p>
          </div>
          <div className='basis-full md:basis-1/4 pl-4 flex justify-center slide-left '>
            <img
              src={pets}
              height='200px'
              width='200px'
              alt='cartoon blue and white cat and dog looking out at user'
            />
          </div>
        </section>

        {/* Section 5 */}
        <section
          ref={(el) => {
            if (el) sectionsRef.current[4] = el;
          }}
          className='flex flex-1 flex-wrap justify-around items-center my-10 '
        >
          <div className='basis-full md:basis-1/4 flex justify-center slide-right'>
            <img
              src={home}
              height='200px'
              width='200px'
              alt='cartoon of woman petting dog in her home'
            />
          </div>
          <div className='basis-full md:basis-3/4 pl-4 slide-left  mb-15'>
            <h2 className='font-cuteCat text-4xl md:text-5xl lg:text-6xl text-center font-bold mt-3 pt-2 mb-2'>
              Step 5
            </h2>
            <h3 className='font-cuteCat text-2xl md:text-3xl lg:text-4xl text-center font-bold mt-3 pt-2 mb-2'>
              Adopt
            </h3>
            <p className='text-lg'>
              The last step is adopting your new furry family member. At the
              time of adoption the adoption fee is due. {/* TODO */}
              {/* See below for a list of fees.  */}
              We also require each animal to go home with a leash, ID tag,
              martingale collar and carrier for cats/kittens.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
export default Adopt;
