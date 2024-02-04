'use client'
import DOMPurify from 'dompurify';
import { useEffect, useState, useRef } from 'react';
import apiClient from '../../apiClient';

const PreviewForm = () => {
    const rawHTML = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <meta name="viewport" content="initial-scale=1.0"> <meta name="format-detection" content="telephone=no"> <title>Email Editor</title> <style type="text/css"> body{ Margin: 0; padding: 0; } img{ border: 0px; display: block; } .socialLinks{ font-size: 6px; } .socialLinks a{ display: inline-block; } .socialIcon{ display: inline-block; vertical-align: top; padding-bottom: 0px; border-radius: 100%; } .oldwebkit{ max-width: 570px; } td.vb-outer{ padding-left: 9px; padding-right: 9px; } table.vb-container, table.vb-row, table.vb-content{ border-collapse: separate; } table.vb-row{ border-spacing: 9px; } table.vb-row.halfpad{ border-spacing: 0; padding-left: 9px; padding-right: 9px; } table.vb-row.fullwidth{ border-spacing: 0; padding: 0; } table.vb-container{ padding-left: 18px; padding-right: 18px; } table.vb-container.fullpad{ border-spacing: 18px; padding-left: 0; padding-right: 0; } table.vb-container.halfpad{ border-spacing: 9px; padding-left: 9px; padding-right: 9px; } table.vb-container.fullwidth{ padding-left: 0; padding-right: 0; } </style> <style type="text/css"> /* yahoo, hotmail */ .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div{ line-height: 100%; } .yshortcuts a{ border-bottom: none !important; } .vb-outer{ min-width: 0 !important; } .RMsgBdy, .ExternalClass{ width: 100%; background-color: #3f3f3f; background-color: #3f3f3f} /* outlook */ table{ mso-table-rspace: 0pt; mso-table-lspace: 0pt; } #outlook a{ padding: 0; } img{ outline: none; text-decoration: none; border: none; -ms-interpolation-mode: bicubic; } a img{ border: none; } @media screen and (max-device-width: 600px), screen and (max-width: 600px) { table.vb-container, table.vb-row{ width: 95% !important; } .mobile-hide{ display: none !important; } .mobile-textcenter{ text-align: center !important; } .mobile-full{ float: none !important; width: 100% !important; max-width: none !important; padding-right: 0 !important; padding-left: 0 !important; } img.mobile-full{ width: 100% !important; max-width: none !important; height: auto !important; } } </style> <style type="text/css"> #ko_singleArticleBlock_3 .links-color a, #ko_singleArticleBlock_3 .links-color a:link, #ko_singleArticleBlock_3 .links-color a:visited, #ko_singleArticleBlock_3 .links-color a:hover{ color: #3f3f3f; color: #3f3f3f; text-decoration: underline } #ko_singleArticleBlock_3 .long-text p{ Margin: 1em 0px } #ko_singleArticleBlock_3 .long-text p:last-child{ Margin-bottom: 0px } #ko_singleArticleBlock_3 .long-text p:first-child{ Margin-top: 0px } #ko_footerBlock_2 .links-color a, #ko_footerBlock_2 .links-color a:link, #ko_footerBlock_2 .links-color a:visited, #ko_footerBlock_2 .links-color a:hover{ color: #cccccc; color: #cccccc; text-decoration: underline } #ko_footerBlock_2 .long-text p{ Margin: 1em 0px } #ko_footerBlock_2 .long-text p:last-child{ Margin-bottom: 0px } #ko_footerBlock_2 .long-text p:first-child{ Margin-top: 0px } </style></head><body bgcolor="#3f3f3f" text="#919191" alink="#cccccc" vlink="#cccccc" style="Margin: 0; padding: 0; background-color: #3f3f3f; color: #919191;"> <center> <!-- preheaderBlock --> <table class="vb-outer" width="100%" cellpadding="0" border="0" cellspacing="0" bgcolor="#3f3f3f" style="background-color: #3f3f3f;" id="ko_preheaderBlock_1"> <tbody><tr> <td class="vb-outer" align="center" valign="top" bgcolor="#3f3f3f" style="padding-left: 9px; padding-right: 9px; background-color: #3f3f3f;"> <div style="display: none; font-size: 1px; color: #333333; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"></div><!--[if (gte mso 9)|(lte ie 8)]><table align="center" border="0" cellspacing="0" cellpadding="0" width="570"><tr><td align="center" valign="top"><![endif]--> <div class="oldwebkit" style="max-width: 570px;"> <table width="570" border="0" cellpadding="0" cellspacing="0" class="vb-row halfpad" bgcolor="#3f3f3f" style="border-collapse: separate; border-spacing: 0; padding-left: 9px; padding-right: 9px; width: 100%; max-width: 570px; background-color: #3f3f3f;"> <tbody><tr> <td align="center" valign="top" bgcolor="#3f3f3f" style="font-size: 0; background-color: #3f3f3f;"><!--[if (gte mso 9)|(lte ie 8)]><table align="center" border="0" cellspacing="0" cellpadding="0" width="552"><tr><![endif]--><!--[if (gte mso 9)|(lte ie 8)]><td align="left" valign="top" width="276"><![endif]--> <div style="display: inline-block; max-width: 276px; vertical-align: top; width: 100%;" class="mobile-full"> <table class="vb-content" border="0" cellspacing="9" cellpadding="0" width="276" style="border-collapse: separate; width: 100%;" align="left"> <tbody><tr> <td width="100%" valign="top" align="left" style="font-weight: normal; text-align: left; font-size: 13px; font-family: Arial, Helvetica, sans-serif; color: #ffffff;"> <a style="text-decoration: underline; color: #ffffff;" target="_new" href="[unsubscribe_link]">Unsubscribe</a> </td> </tr> </tbody></table></div><!--[if (gte mso 9)|(lte ie 8)]></td><td align="left" valign="top" width="276"><![endif]--><div style="display: inline-block; max-width: 276px; vertical-align: top; width: 100%;" class="mobile-full mobile-hide"> <table class="vb-content" border="0" cellspacing="9" cellpadding="0" width="276" style="border-collapse: separate; width: 100%; text-align: right;" align="left"> <tbody><tr> <td width="100%" valign="top" style="font-weight: normal; font-size: 13px; font-family: Arial, Helvetica, sans-serif; color: #ffffff;"> <span style="color: #ffffff; text-decoration: underline;"> <a href="[show_link]" style="text-decoration: underline; color: #ffffff;" target="_new">View in your browser</a> </span> </td> </tr> </tbody></table></div><!--[if (gte mso 9)|(lte ie 8)]></td></tr></table><![endif]--> </td> </tr> </tbody></table> </div><!--[if (gte mso 9)|(lte ie 8)]></td></tr></table><![endif]--> </td> </tr> </tbody></table> <!-- /preheaderBlock --> <table class="vb-outer" width="100%" cellpadding="0" border="0" cellspacing="0" bgcolor="#bfbfbf" style="background-color: #bfbfbf;" id="ko_singleArticleBlock_3"> <tbody><tr> <td class="vb-outer" align="center" valign="top" bgcolor="#bfbfbf" style="padding-left: 9px; padding-right: 9px; background-color: #bfbfbf;"><!--[if (gte mso 9)|(lte ie 8)]><table align="center" border="0" cellspacing="0" cellpadding="0" width="570"><tr><td align="center" valign="top"><![endif]--> <div class="oldwebkit" style="max-width: 570px;"> <table width="570" border="0" cellpadding="0" cellspacing="18" class="vb-container fullpad" bgcolor="#ffffff" style="border-collapse: separate; border-spacing: 18px; padding-left: 0; padding-right: 0; width: 100%; max-width: 570px; background-color: #ffffff;"> <tbody><tr> <td width="100%" valign="top" align="left" class="links-color"> <img border="0" hspace="0" vspace="0" width="534" class="mobile-full" alt="" style="border: 0px; display: block; vertical-align: top; max-width: 534px; width: 100%; height: auto;" src="http://localhost:8000/mosaico/img/?method=placeholder&amp;params=534%2C200"> </td> </tr> <tr><td><table align="left" border="0" cellpadding="0" cellspacing="0" width="100%"> <tbody><tr> <td style="font-size: 18px; font-family: Arial, Helvetica, sans-serif; color: #3f3f3f; text-align: left;"> <span style="color: #3f3f3f;"> Section Title </span> </td> </tr> <tr> <td height="9" style="font-size: 1px; line-height: 1px;">&nbsp;</td> </tr> <tr> <td align="left" class="long-text links-color" style="text-align: left; font-size: 13px; font-family: Arial, Helvetica, sans-serif; color: #3f3f3f;"> <p style="Margin: 1em 0px; Margin-bottom: 0px; Margin-top: 0px;">Far far away, behind the word mountains, far from the countries <a href="" style="color: #3f3f3f; color: #3f3f3f; text-decoration: underline;">Vokalia and Consonantia</a>, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia.</p> </td> </tr> <tr> <td height="13" style="font-size: 1px; line-height: 1px;">&nbsp;</td> </tr> <tr> <td valign="top"> <table cellpadding="0" border="0" align="left" cellspacing="0" class="mobile-full"> <tbody><tr> <td width="auto" valign="middle" bgcolor="#bfbfbf" align="center" height="26" style="font-size: 13px; font-family: Arial, Helvetica, sans-serif; text-align: center; color: #3f3f3f; font-weight: normal; padding-left: 18px; padding-right: 18px; background-color: #bfbfbf; border-radius: 4px;"> <a style="text-decoration: none; color: #3f3f3f; font-weight: normal;" target="_new" href="">BUTTON</a> </td> </tr> </tbody></table> </td> </tr> </tbody></table></td></tr> </tbody></table> </div><!--[if (gte mso 9)|(lte ie 8)]></td></tr></table><![endif]--> </td> </tr> </tbody></table> <!-- footerBlock --> <table width="100%" cellpadding="0" border="0" cellspacing="0" bgcolor="#3f3f3f" style="background-color: #3f3f3f;" id="ko_footerBlock_2"> <tbody><tr> <td align="center" valign="top" bgcolor="#3f3f3f" style="background-color: #3f3f3f;"><!--[if (gte mso 9)|(lte ie 8)]><table align="center" border="0" cellspacing="0" cellpadding="0" width="570"><tr><td align="center" valign="top"><![endif]--> <div class="oldwebkit" style="max-width: 570px;"> <table width="570" style="border-collapse: separate; border-spacing: 9px; padding-left: 9px; padding-right: 9px; width: 100%; max-width: 570px;" border="0" cellpadding="0" cellspacing="9" class="vb-container halfpad" align="center"> <tbody><tr> <td class="long-text links-color" style="text-align: center; font-size: 13px; color: #919191; font-weight: normal; text-align: center; font-family: Arial, Helvetica, sans-serif;"><p style="Margin: 1em 0px; Margin-bottom: 0px; Margin-top: 0px;">Email sent to <a href="mailto:[mail]" style="color: #cccccc; color: #cccccc; text-decoration: underline;">[mail]</a></p></td> </tr> <tr> <td style="text-align: center;"> <a href="[unsubscribe_link]" style="text-decoration: underline; color: #ffffff; text-align: center; font-size: 13px; font-weight: normal; font-family: Arial, Helvetica, sans-serif;" target="_new"><span>Unsubscribe</span></a> </td> </tr> <tr style="text-align: center;"> <td align="center"> </td> </tr> </tbody></table> </div><!--[if (gte mso 9)|(lte ie 8)]></td></tr></table><![endif]--> </td> </tr> </tbody></table> <!-- /footerBlock --> </center></body></html>'
    const [safeHTML, setSafeHTML] = useState('');
    useEffect(() => {
        setSafeHTML(DOMPurify.sanitize(rawHTML));
    }, [rawHTML]);
    const [subject, setSubject] = useState('');
    const [recipientIds, setRecipientIds] = useState(['123', '456', '789']); // Example recipient IDs
    const [emailSent, setEmailSent] = useState(false); // State to track if email is sent
    const [sendingError, setSendingError] = useState(''); // State to store sending error if any
    const fileInputRef = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSendingError(''); // Reset sending error on new submission
        const formData = new FormData();
        formData.append('subject', subject);

        // Append multiple files
        const files = fileInputRef.current?.files || [];
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }

        // Append recipient IDs
        // Append each ID separately (server needs to handle multiple values with the same key)
        recipientIds.forEach(id => formData.append('recipientIds', id));


        try {
            const response = await apiClient.post('http://localhost:8000/your-api-endpoint2/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setEmailSent(true); // Update state to indicate email has been sent
        } catch (error) {
            setEmailSent(false); // Ensure emailSent is false on error
            setSendingError('Failed to send email.'); // Update sending error state
        }
    };


    return (
        <>
            <form onSubmit={handleSubmit}>
                <div id="createEventModal" tabIndex="-1" aria-hidden="true" className={` p-4 h-max lg:m-auto max-lg:w-full`}>
                    <div className="relative w-full lg:w-[70vw] ">
                        {/* // Modal Content */}
                        <div className="relative bg-white rounded-2xl shadow ">
                            {/* //Modal Header */}
                            <div className="flex items-start justify-between p-4 border-b rounded-t ">
                                <h3 className="text-xl font-semibold text-gray-900 ">
                                    Preview Email
                                </h3>

                            </div>
                            {/* // Modal Body */}
                            {(emailSent || sendingError) ? (<div className={`p-4 mb-4 text-sm rounded-lg ${sendingError ? 'text-red-700 bg-red-100' : 'text-green-700 bg-green-100'}`} role="alert">
                                {sendingError ? sendingError : 'Email successfully sent!'}
                            </div>) : (<div className="p-6  max-h-[calc(100vh-20rem)] overflow-x-auto ">
                                <div className="flex flex-col md:flex-row space-x-6">
                                    <div className=" md:w-1/2 2xl:w-3/4 space-y-6">
                                        <div className="col-span-6 sm:col-span-4">
                                            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">Subject</label>
                                            <input type="text" name="title" id="title" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="Bonnie" required="" />
                                        </div>
                                        <div className="max-w-lg">
                                            <label className="block text-sm font-medium text-gray-900" htmlFor="user_avatar">Upload Attachments</label>
                                            <input ref={fileInputRef} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-2.5" aria-describedby="user_avatar_help" id="user_avatar" type="file" multiple />
                                            <div className="mt-1 text-sm text-gray-500 " id="user_avatar_help">Please limit file size to 10MB</div>
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 ">Preview</label>
                                            <div dangerouslySetInnerHTML={{ __html: safeHTML }}></div>
                                        </div>


                                    </div>
                                    <div className="md:w-1/2 2xl:w-1/4">
                                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">Recipients</label>
                                        <input type="text" name="first-name" id="first-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="Add Email" required="" />

                                    </div>
                                </div>
                            </div>)}
                            {/* // Modal Footer */}
                            <div className="flex items-center p-6 space-x-3 border-t border-gray-200 rounded-b justify-end">
                                {emailSent ?
                                    (<button type="button" onClick={() => { window.location.href = "http://localhost:3000/dashboard" }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Go to Dashboard</button>
                                    ) : !sendingError ? (<button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Send Email</button>
                                    ) : (<button onClick={() => { window.location.reload() }} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Try Again</button>)}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default PreviewForm