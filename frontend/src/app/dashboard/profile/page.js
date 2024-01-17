'use client'

import ProfileTabs from "./components/ProfileTabs"
import { useDispatch, useSelector } from "react-redux"
import moment from 'moment';
import { momentLocalizer } from 'react-big-calendar'
import AppointmentsWidget from "./components/AppointmentsWidget";
import EditAppointmentModal from "./components/EditAppointmentModal";
import { toggleSettingsButton, toggleSelectedTab } from "../../lib/features/profile/profileSlice";
import { useEffect } from "react";
import EditProfileForm from "./components/EditProfileForm";


const ProfilePage = () => {
    const { selectedTab, settingsButtonPressed } = useSelector((state) => state.profile)
    const localizer = momentLocalizer(moment)
    const dispatch = useDispatch()

    /* Loophole to redux refreshing state on page load 
    Allows for illusion of redirecting and then setting state*/
    useEffect(() => {
        const selectedTab = localStorage.getItem('selectedTab');
        if (selectedTab !== null) {
            dispatch(toggleSelectedTab(parseInt(selectedTab)));
        }
    }, [dispatch]);

    return (
        <div className="">
            <ProfileTabs />
            <section className={`${selectedTab == 0 ? '' : 'hidden'}`}>
                <div className="flex justify-around mx-auto sm:w-[80%] max-h-[80vh] text-center bg-white rounded-2xl p-6 m-6">
                    <div className="w-full">
                        <AppointmentsWidget localizer={localizer} />
                    </div>

                    <EditAppointmentModal />
                </div>
            </section>
            <section className={`${selectedTab == 1 ? '' : 'hidden'} `}>
                Goodbye
            </section>
            <section className={`${selectedTab == 2 ? '' : 'hidden'} `}>
                A doo
            </section>
            <section className={`${selectedTab == 3 ? '' : 'hidden'} flex w-full`}>
                <EditProfileForm />
            </section>

        </div>
    )
}

export default ProfilePage