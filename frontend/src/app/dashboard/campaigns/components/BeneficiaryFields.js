'use client'

const BeneficiaryFields = ({ selection, beneficiary_data, handleBeneficiaryDataChange }) => {
    const institutionTypeOptions = [
        { value: "PRIMARY", label: "Primary" },
        { value: "SECONDARY", label: "Secondary" },
        { value: "UNIVERSITY", label: "University" },
        { value: "ORPHANAGE", label: "Orphanage" }
    ];

    const healthcareTypeOptions = [
        { value: "HOSPITAL", label: "Hospital" },
        { value: "CLINIC", label: "Clinic" },
        { value: "HEALTH CENTER", label: "Health Center" },
        { value: "SENIOR HOMES", label: "Senior Homes" },
    ]

    const reliefTypeOptions = [
        { value: "NATURAL_DISASTER", label: "Natural Disaster" },
        { value: "CONFLICT", label: "Conflict" },
        { value: "PANDEMIC", label: "Pandemic" }
    ];

    const conservationTypeOptions = [
        { value: "REFORESTATION", label: "Reforestation" },
        { value: "WILDLIFE_PROTECTION", label: "Wildlife Protection" }
    ];

    const supportTypeOptions = [
        { value: "FINANCIAL_AID", label: "Financial Aid" },
        { value: "EQUIPMENT", label: "Equipment" },
        { value: "TRAINING", label: "Training" }
    ];
    return (
        <div>

            {selection === 'EDUCATIONAL_INSTITUTION' && (
                <>
                    <div className="mt-4">
                        <label htmlFor="institution_type" className="block mb-2 text-sm font-medium text-gray-900">Institution Type</label>
                        <select
                            id="institution_type"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            defaultValue={"DEFAULT"}
                            onChange={e => handleBeneficiaryDataChange('institution_type', e.target.value)}
                            required
                        >
                            <option value={"DEFAULT"} disabled> -- select an option -- </option>
                            {institutionTypeOptions.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>

                            ))}
                        </select>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="number_of_students" className="block mb-2 text-sm font-medium text-gray-900">Number of Students</label>
                        <input
                            type="number"
                            id="number_of_students"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            value={beneficiary_data?.number_of_students || ''}
                            onChange={e => handleBeneficiaryDataChange('number_of_students', e.target.value)}
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="programs_offered" className="block mb-2 text-sm font-medium text-gray-900">Programs Offered</label>
                        <textarea
                            id="sprograms_offered"
                            value={beneficiary_data?.programs_offered}
                            onChange={(e) => handleBeneficiaryDataChange('programs_offered', e.target.value)}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            placeholder="Tell us about the institutions specializations, if applicable"
                            style={{ minHeight: '50px' }}
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="accredidation_details" className="block mb-2 text-sm font-medium text-gray-900">Accredidation Details</label>
                        <textarea
                            id="accredidation_details"
                            value={beneficiary_data?.accredidation_details}
                            onChange={(e) => handleBeneficiaryDataChange('accredidation_details', e.target.value)}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            placeholder="Tell us about the institutions specializations, if applicable"
                            style={{ minHeight: '50px' }}
                        />
                    </div>
                </>
            )}

            {selection === 'HEALTHCARE_INSTITUTION' && (
                <>
                    <div className="mt-4">
                        <label htmlFor="institution_type" className="block mb-2 text-sm font-medium text-gray-900">Institution Type</label>
                        <select
                            id="institution_type"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            defaultValue={"DEFAULT"}
                            onChange={e => handleBeneficiaryDataChange('institution_type', e.target.value)}
                            required
                        >
                            <option value={"DEFAULT"} disabled> -- select an option -- </option>
                            {healthcareTypeOptions.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="number_of_beds" className="block mb-2 text-sm font-medium text-gray-900">Number of Beds</label>
                        <input
                            type="number"
                            id="number_of_beds"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            value={beneficiary_data?.number_of_beds || ''}
                            onChange={e => handleBeneficiaryDataChange('number_of_beds', e.target.value)}
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="specializations" className="block mb-2 text-sm font-medium text-gray-900">Specializations</label>
                        <textarea
                            id="specializations"
                            value={beneficiary_data?.specializations}
                            onChange={(e) => handleBeneficiaryDataChange('specializations', e.target.value)}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            placeholder="Tell us about the institutions specializations, if applicable"
                            style={{ minHeight: '50px' }}
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="operating_hours" className="block mb-2 text-sm font-medium text-gray-900">Operating Hours</label>
                        <textarea
                            id="operating_hours"
                            value={beneficiary_data?.operating_hours}
                            onChange={(e) => handleBeneficiaryDataChange('operating_hours', e.target.value)}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            placeholder="Tell us about the operating hours, if applicable"
                            style={{ minHeight: '50px' }}
                        />
                    </div>
                </>
            )}

            {selection === 'HEALTHCARE_PATIENT' && (
                <>
                    <div className="mt-4">
                        <label htmlFor="hospital" className="block mb-2 text-sm font-medium text-gray-900">Hospital</label>
                        <input
                            type="text"
                            id="hospital"
                            maxLength="255"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            value={beneficiary_data?.hospital || ''}
                            onChange={e => handleBeneficiaryDataChange('hospital', e.target.value)}
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="illness" className="block mb-2 text-sm font-medium text-gray-900">Illness</label>
                        <input
                            type="text"
                            id="illness"
                            maxLength="255"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            value={beneficiary_data?.illness || ''}
                            onChange={e => handleBeneficiaryDataChange('illness', e.target.value)}
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="notes" className="block mb-2 text-sm font-medium text-gray-900">Notes</label>
                        <textarea
                            id="notes"
                            value={beneficiary_data?.notes}
                            onChange={(e) => handleBeneficiaryDataChange('notes', e.target.value)}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            placeholder="Tell us about the health status, if applicable"
                            style={{ minHeight: '50px' }}
                        />
                    </div>

                </>
            )}

            {selection === 'ANIMAL' && (
                <>
                    <div className="mt-4">
                        <label htmlFor="species" className="block mb-2 text-sm font-medium text-gray-900">Species</label>
                        <input
                            type="text"
                            id="species"
                            maxLength="255"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            value={beneficiary_data?.species || ''}
                            onChange={e => handleBeneficiaryDataChange('species', e.target.value)}
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="health_status" className="block mb-2 text-sm font-medium text-gray-900">Health Status</label>
                        <textarea
                            id="health_status"
                            value={beneficiary_data?.health_status}
                            onChange={(e) => handleBeneficiaryDataChange('health_status', e.target.value)}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            placeholder="Tell us about the health status, if applicable"
                            style={{ minHeight: '50px' }}
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900">Locations</label>
                        <textarea
                            id="location"
                            value={beneficiary_data?.location}
                            onChange={(e) => handleBeneficiaryDataChange('location', e.target.value)}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            placeholder="Tell us about the location(s), if applicable"
                            style={{ minHeight: '50px' }}
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="special_needs" className="block mb-2 text-sm font-medium text-gray-900">Special Needs</label>
                        <textarea
                            id="special_needs"
                            value={beneficiary_data?.special_needs}
                            onChange={(e) => handleBeneficiaryDataChange('special_needs', e.target.value)}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            placeholder="Tell us about any special needs, if applicable"
                            style={{ minHeight: '50px' }}
                        />
                    </div>
                </>
            )}
            {selection === 'SOCIAL_WELFARE_PROGRAM' && (
                <>
                    <div className="mt-4">
                        <label htmlFor="institution_type" className="block mb-2 text-sm font-medium text-gray-900">Program Type</label>
                        <select
                            id="program_type"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            defaultValue={"DEFAULT"}
                            onChange={e => handleBeneficiaryDataChange('program_type', e.target.value)}
                            required
                        >
                            <option value={"DEFAULT"} disabled> -- select an option -- </option>
                            {healthcareTypeOptions.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="target_population" className="block mb-2 text-sm font-medium text-gray-900">Target Population</label>
                        <textarea
                            id="target_population"
                            value={beneficiary_data?.target_population}
                            onChange={(e) => handleBeneficiaryDataChange('target_population', e.target.value)}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            placeholder="Tell us about the target population, if applicable"
                            style={{ minHeight: '50px' }}
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="key_activities" className="block mb-2 text-sm font-medium text-gray-900">Key Activities</label>
                        <textarea
                            id="key_activities"
                            value={beneficiary_data?.key_activities}
                            onChange={(e) => handleBeneficiaryDataChange('key_activities', e.target.value)}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            placeholder="Tell us about the key activities, if applicable"
                            style={{ minHeight: '50px' }}
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="impact_metrics" className="block mb-2 text-sm font-medium text-gray-900">Impact Metrics</label>
                        <textarea
                            id="impact_metrics"
                            value={beneficiary_data?.impact_metrics}
                            onChange={(e) => handleBeneficiaryDataChange('impact_metrics', e.target.value)}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            placeholder="Tell us about any impact metrics"
                            style={{ minHeight: '50px' }}
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="funding_sources" className="block mb-2 text-sm font-medium text-gray-900">Funding Sources</label>
                        <textarea
                            id="funding_sources"
                            value={beneficiary_data?.funding_sources}
                            onChange={(e) => handleBeneficiaryDataChange('funding_sources', e.target.value)}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            placeholder="Tell us about any other funding sources"
                            style={{ minHeight: '50px' }}
                        />
                    </div>
                </>
            )}
            {selection === 'EMERGENCY_RELIEF' && (
                <>
                    <div className="mt-4">
                        <label htmlFor="institution_type" className="block mb-2 text-sm font-medium text-gray-900">Relief Type</label>
                        <select
                            id="institution_type"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            defaultValue={"DEFAULT"}
                            onChange={e => handleBeneficiaryDataChange('relief_type', e.target.value)}
                            required
                        >
                            <option value={"DEFAULT"} disabled> -- select an option -- </option>
                            {reliefTypeOptions.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900">Area Covered</label>
                        <textarea
                            id="location"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            value={beneficiary_data?.location || ''}
                            onChange={e => handleBeneficiaryDataChange('area_covered', e.target.value)}
                            placeholder="General Location, such as region or landmark"

                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="number_of_beneficiaries" className="block mb-2 text-sm font-medium text-gray-900">Number of Beneficiaries</label>
                        <input
                            type="number"
                            id="number_of_beneficiaries"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            value={beneficiary_data?.number_of_beds || ''}
                            onChange={e => handleBeneficiaryDataChange('number_of_beneficiaries', e.target.value)}

                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="key_services" className="block mb-2 text-sm font-medium text-gray-900">Key Services Provided</label>
                        <textarea
                            id="key_services"
                            value={beneficiary_data?.key_services_provided}
                            onChange={(e) => handleBeneficiaryDataChange('key_services_provided', e.target.value)}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            placeholder="Tell us about the key services, if applicable"
                            style={{ minHeight: '50px' }}
                        />
                    </div>
                </>
            )}
            {selection === 'ENVIRONMENTAL_PROTECTION' && (
                <>
                    <div className="mt-4">
                        <label htmlFor="conservation_type" className="block mb-2 text-sm font-medium text-gray-900">Conservation Type</label>
                        <select
                            id="conservation_type"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            defaultValue={"DEFAULT"}
                            onChange={e => handleBeneficiaryDataChange('conservation_type', e.target.value)}
                            required
                        >
                            <option value={"DEFAULT"} disabled> -- select an option -- </option>
                            {conservationTypeOptions.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900">Location</label>
                        <input
                            type="text"
                            id="loaction"
                            maxLength="255"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            value={beneficiary_data?.location || ''}
                            onChange={e => handleBeneficiaryDataChange('location', e.target.value)}
                            placeholder="General Location, such as region or landmark"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="impact_metrics" className="block mb-2 text-sm font-medium text-gray-900">Impact Metrics</label>
                        <textarea
                            id="impact_metrics"
                            value={beneficiary_data?.impact_metrics}
                            onChange={(e) => handleBeneficiaryDataChange('impact_metrics', e.target.value)}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            placeholder="Tell us about any other funding sources"
                            style={{ minHeight: '50px' }}
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="funding_sources" className="block mb-2 text-sm font-medium text-gray-900">Funding Sources</label>
                        <textarea
                            id="funding_sources"
                            value={beneficiary_data?.funding_sources}
                            onChange={(e) => handleBeneficiaryDataChange('funding_sources', e.target.value)}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            placeholder="Tell us about any other funding sources"
                            style={{ minHeight: '50px' }}
                        />
                    </div>
                </>
            )}
            {selection === 'COMMUNITY_DEVELOPMENT' && (
                <>

                    <div className="mt-4">
                        <label htmlFor="community_name" className="block mb-2 text-sm font-medium text-gray-900">Community Name</label>
                        <input
                            type="text"
                            maxLength="255"
                            id="community_name"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            value={beneficiary_data?.community_name || ''}
                            onChange={e => handleBeneficiaryDataChange('community_name', e.target.value)}
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900">Location</label>
                        <input
                            type="text"
                            id="community_name"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            value={beneficiary_data?.location || ''}
                            onChange={e => handleBeneficiaryDataChange('location', e.target.value)}
                            placeholder="General Location, such as nearest landmark"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="key_objectives" className="block mb-2 text-sm font-medium text-gray-900">Key Objectives</label>
                        <textarea
                            id="key_objectives"
                            value={beneficiary_data?.key_objectives}
                            onChange={(e) => handleBeneficiaryDataChange('key_objectives', e.target.value)}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            placeholder="Tell us about any other funding sources"
                            style={{ minHeight: '50px' }}
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="impact_metrics" className="block mb-2 text-sm font-medium text-gray-900">Impact Metrics</label>
                        <textarea
                            id="impact_metrics"
                            value={beneficiary_data?.impact_metrics}
                            onChange={(e) => handleBeneficiaryDataChange('impact_metrics', e.target.value)}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            placeholder="Tell us about any other funding sources"
                            style={{ minHeight: '50px' }}
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="funding_sources" className="block mb-2 text-sm font-medium text-gray-900">Funding Sources</label>
                        <textarea
                            id="funding_sources"
                            value={beneficiary_data?.funding_sources}
                            onChange={(e) => handleBeneficiaryDataChange('funding_sources', e.target.value)}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            placeholder="Tell us about any other funding sources"
                            style={{ minHeight: '50px' }}
                        />
                    </div>
                </>
            )}
            {selection === 'DISABILITY_SUPPORT' && (
                <>
                    <div className="mt-4">
                        <label htmlFor="institution_type" className="block mb-2 text-sm font-medium text-gray-900">Support Type</label>
                        <select
                            id="institution_type"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            defaultValue={"DEFAULT"}
                            onChange={e => handleBeneficiaryDataChange('support_type', e.target.value)}
                            required
                        >
                            <option value={"DEFAULT"} disabled> -- select an option -- </option>
                            {healthcareTypeOptions.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="number_of_beneficiaries" className="block mb-2 text-sm font-medium text-gray-900">Number of Beneficiaries</label>
                        <input
                            type="number"
                            id="number_of_beneficiaries"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            value={beneficiary_data?.number_of_beneficiaries || ''}
                            onChange={e => handleBeneficiaryDataChange('number_of_beds', e.target.value)}
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="key_services" className="block mb-2 text-sm font-medium text-gray-900">Key Services Provided</label>
                        <textarea
                            id="key_services"
                            value={beneficiary_data?.key_services_provided}
                            onChange={(e) => handleBeneficiaryDataChange('key_services_provided', e.target.value)}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            placeholder="Tell us about the key services, if applicable"
                            style={{ minHeight: '50px' }}
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="funding_sources" className="block mb-2 text-sm font-medium text-gray-900">Funding Sources</label>
                        <textarea
                            id="funding_sources"
                            value={beneficiary_data?.funding_sources}
                            onChange={(e) => handleBeneficiaryDataChange('funding_sources', e.target.value)}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            placeholder="Tell us about any other funding sources"
                            style={{ minHeight: '50px' }}
                        />
                    </div>

                </>
            )}

        </div>
    )
}

export default BeneficiaryFields