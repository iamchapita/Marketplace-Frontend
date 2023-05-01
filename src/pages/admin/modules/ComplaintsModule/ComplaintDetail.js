import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import CustomizableAlert from "../../../../components/CustomizableAlert";
import apiClient from "../../../../utils/apiClient";
import { useParams } from "react-router-dom";
import Button from "../../../../components/Button";


const ComplaintDetail = ({ isLoggedIn, isAdmin, areUserStatusLoaded }) => {

    const [isReadyToRender, setIsReadyToRender] = useState(false);
    const [isPerformingAction, setIsPerformingAction] = useState(false);
    const [conmplaintDetails, setComplaintDetails] = useState(null);
    const [productDetails, setProductetails] = useState(null);
    const [complaintOwnerDetails, setComplaintOwnerDetails] = useState(null);
    const [reportedUserDetails, setReportedUserDetails] = useState(null);
    const [complaintOwnerIsBanned, setComplaintOwnerIsBanned] = useState(null);
    const [reportedUserIsBanned, setReportedUserIsBanned] = useState(null);
    const [complaintOwnerRating, setComplaintOwnerRating] = useState(null);
    const [reportedUserRating, setReportedUserRating] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        const action = async () => {
            await apiClient.post('/getComplaintById', {
                id: id
            }).then((response) => {

                const [complaintOwnerData, reportedUserData, productData] = extractData(response.data);
                setComplaintOwnerDetails(complaintOwnerData);
                setComplaintOwnerIsBanned(Boolean(complaintOwnerData.complaintOwnerIsBanned));
                setReportedUserDetails(reportedUserData);
                setReportedUserIsBanned(Boolean(reportedUserData.reportedUserIsBanned));
                setProductetails(productData);
                setIsReadyToRender(true);

            }).catch((error) => {
                console.log(error);
            });
        }
        action();

    }, []);

    const extractData = (data) => {
        return Object.entries(data).reduce(([o1, o2, o3], [key, value]) => {
            if (key.startsWith("complaintOwner")) {
                o1[key] = value;
            } else if (key.startsWith("reportedUser")) {
                o2[key] = value;
            } else if (key.startsWith("product")) {
                o3[key] = value;
            }
            return [o1, o2, o3];
        }, [{}, {}, {}]);
    };


    const handleBanButton = (type) => {
        setIsPerformingAction(true);
        let data = {};

        if (type === 'complaintOwner') {
            data.id = complaintOwnerDetails.complaintOwnerId
            data.isBanned = !complaintOwnerIsBanned
        } else {
            data.id = reportedUserDetails.reportedUserId
            data.isBanned = !reportedUserIsBanned
        }

        const action = async () => {

            await apiClient.post('/setUserIsBanned', data).then((response) => {
                type === 'complaintOwner' ? setComplaintOwnerIsBanned(!complaintOwnerIsBanned) : setReportedUserIsBanned(!reportedUserIsBanned);
                setIsPerformingAction(false);
            }).catch((error) => {
                console.log(error);
            });
        };
        action();
    };

    if (!areUserStatusLoaded) {
        return (
            <div className='container-fluid' style={{ marginTop: '3em' }}>
                <div className="container d-flex justify-content-center">
                    <Spinner animation="border" variant='light' />
                </div>
            </div>
        );
    }

    if (areUserStatusLoaded) {

        if (!isLoggedIn) {
            return (
                <div>
                    <CustomizableAlert title={'Error'} text={'No tienes Autorización para acceder a este recurso.'} />
                </div>
            );
        }

        if (isAdmin) {
            return (
                <div>
                    <CustomizableAlert title={'Error'} text={'No tienes Autorización para acceder a este recurso.'} />
                </div>
            );
        }

        return (
            <div className='container-fluid' style={{ marginTop: '3em' }}>
                {
                    !isReadyToRender ? (
                        <div className="container d-flex justify-content-center">
                            <Spinner animation="border" variant='light' />
                        </div>

                    ) : (
                        <div className='row mx-4 my-3' style={{ color: "white" }}>
                            <div className='col-12 container-style'>
                                <h1 className="text-center">Detalles de Denuncia</h1>
                                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 row-cols-xxl-4 g-2 mt-4">
                                    <div className="col col-sm-6 col-md-4 col-xl-3 col-xxl-3 p-2">
                                        <div className={complaintOwnerIsBanned ? 'userInfoContainer isBanned' : 'userInfoContainer'} style={{ padding: '1em 1em 1em 1em', wordWrap: 'break-word' }}>
                                            <div className='userInfo'>
                                                <div className="p-0">
                                                    <h3>Usuario Denunciante</h3>
                                                    <hr style={{ marginTop: 0 }}></hr>
                                                    <a className="link-perfil" href={`/userProfile/${complaintOwnerDetails.complaintOwnerId}`} ><h4>{complaintOwnerDetails.complaintOwnerName}</h4></a>
                                                </div>
                                                <div className="p-0" style={{ marginTop: '1em' }}>
                                                    <p>Ubicación: {complaintOwnerDetails.complaintOwnerDeparmentName + ', ' + complaintOwnerDetails.complaintOwnerMunicipalityName}</p>
                                                    <p>Correo Electrónico: {complaintOwnerDetails.complaintOwnerEmail}</p>
                                                </div>
                                                {
                                                    isPerformingAction ? (
                                                        <div>
                                                            <hr></hr>
                                                            <Button
                                                                type={'button'}
                                                                buttonClass={'danger'}
                                                                tooltipText={'Espera'}
                                                                disabled={!isPerformingAction}
                                                                fieldLabel={
                                                                    <Spinner
                                                                        animation="border"
                                                                        variant="light"
                                                                        size="sm"
                                                                    />
                                                                }
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <hr></hr>
                                                            <Button
                                                                fieldLabel={
                                                                    complaintOwnerIsBanned ?
                                                                        'Desbannear' :
                                                                        'Bannear'
                                                                }
                                                                type={'button'}
                                                                buttonClass={'danger'}
                                                                tooltipText={
                                                                    complaintOwnerIsBanned ?
                                                                        'Desbanee el usuario.' :
                                                                        'Banee el usuario.'
                                                                }
                                                                onClick={() => { handleBanButton('complaintOwner') }}
                                                            />
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <div className='userStats'>

                                            </div>
                                        </div>
                                        <div className={reportedUserIsBanned ? 'userInfoContainer isBanned' : 'userInfoContainer'} style={{ padding: '1em 1em 1em 1em', wordWrap: 'break-word', marginTop: '1em' }}>
                                            <div className='userInfo'>
                                                <div className="p-0">
                                                    <h3>Usuario Denunciado</h3>
                                                    <hr style={{ marginTop: 0 }}></hr>
                                                    <a className="link-perfil" href={`/userProfile/${reportedUserDetails.reportedUserId}`}><h4>{reportedUserDetails.reportedUserName}</h4></a>
                                                </div>
                                                <div className="p-0" style={{ marginTop: '1em' }}>
                                                    <p>Ubicación: {reportedUserDetails.reportedUserDeparmentName + ', ' + reportedUserDetails.reportedUserMunicipalityName}</p>
                                                    <p>Correo Electrónico: {reportedUserDetails.reportedUserEmail}</p>
                                                </div>
                                                {
                                                    isPerformingAction ? (
                                                        <div>
                                                            <hr></hr>
                                                            <Button
                                                                type={'button'}
                                                                buttonClass={'danger'}
                                                                tooltipText={'Espera'}
                                                                disabled={!isPerformingAction}
                                                                fieldLabel={
                                                                    <Spinner
                                                                        animation="border"
                                                                        variant="light"
                                                                        size="sm"
                                                                    />
                                                                }
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <hr></hr>
                                                            <Button
                                                                fieldLabel={
                                                                    reportedUserIsBanned ?
                                                                        'Desbannear' :
                                                                        'Bannear'
                                                                }
                                                                type={'button'}
                                                                buttonClass={'danger'}
                                                                tooltipText={
                                                                    reportedUserIsBanned ?
                                                                        'Desbanee el usuario.' :
                                                                        'Banee el usuario.'
                                                                }
                                                                onClick={() => { handleBanButton('reported') }}
                                                            />
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <div className='userStats'>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col col-sm-6 col-md-8 col-xl-9 col-xxl-9 p-2">
                                        <div className="complaintContainer">
                                            <div className="complaintInfo">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div >
        );
    }
};

export default ComplaintDetail;