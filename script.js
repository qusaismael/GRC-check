document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        { id: 1, category: 'jordan_law', article: 'Article 3.A', question: 'Do you acknowledge that this law applies to all personal data you control, including data collected <strong>before</strong> the law was enacted?' },
        { id: 2, category: 'jordan_law', article: 'Article 4.A', question: 'Do you have a default practice of obtaining prior, explicit consent from individuals before processing their personal data, unless a specific legal exception from Article 6 applies?' },
        { id: 3, category: 'jordan_law', article: 'Article 4.B & 8.D', question: 'Have you established a clear, accessible, and functional process for individuals to exercise all their rights (access, correction, withdrawal of consent, erasure, etc.)?' },
        { id: 4, category: 'jordan_law', article: 'Article 5.A.1', question: 'Is your method for obtaining consent always explicit (e.g., an unticked checkbox) and documented in writing or electronically for every individual?' },
        { id: 5, category: 'jordan_law', article: 'Article 5.A.2', question: 'When you request consent, do you clearly specify the exact purpose of the processing and the duration for which the consent will be valid?' },
        { id: 6, category: 'jordan_law', article: 'Article 5.A.3', question: 'Are your consent requests written in clear, simple, and unambiguous language, free of legal jargon, and easily accessible?' },
        { id: 7, category: 'jordan_law', article: 'Article 5.A.4', question: 'Do you have a specific procedure to obtain verifiable consent from a parent or legal guardian for processing data of individuals who lack legal capacity (e.g., minors)?' },
        { id: 8, category: 'jordan_law', article: 'Article 5.B', question: 'If you change the nature, type, or purpose of data processing, do you have a process to obtain new, specific consent for those changes?' },
        { id: 9, category: 'jordan_law', article: 'Article 7.A & 7.B', question: 'For every data processing activity, have you clearly defined and documented a lawful, specific purpose that is aligned with the original reason for data collection?' },
        { id: 10, category: 'jordan_law', article: 'Article 7.D', question: 'Do you have procedures in place to ensure the personal data you process is accurate, truthful, and kept up-to-date?' },
        { id: 11, category: 'jordan_law', article: 'Article 7.E', question: 'Do you have a data retention policy that ensures personal data is deleted or anonymized once the processing purpose is fulfilled?' },
        { id: 12, category: 'jordan_law', article: 'Article 7.G', question: 'Is your data processing conducted in a secure manner that ensures confidentiality, integrity, and prevents any unauthorized alterations?' },
        { id: 13, category: 'jordan_law', article: 'Article 8.B', question: 'Have you implemented and documented specific security, technical, and organizational measures (e.g., encryption, access controls) to protect data as directed by the Council?' },
        { id: 14, category: 'jordan_law', article: 'Article 8.C', question: 'Have you established and published a formal mechanism (e.g., on your website) for receiving and responding to data-related complaints?' },
        { id: 15, category: 'jordan_law', article: 'Article 9', question: 'Before processing data, do you inform the individual in writing/electronically about: the data being processed, the purpose, the duration, the processor\'s identity, security measures, and any profiling?' },
        { id: 16, category: 'jordan_law', article: 'Article 10.A', question: 'Do you have a defined process to fulfill requests from individuals (or The Unit) to erase or hide their data when processing is unlawful, consent is withdrawn, or the purpose changes?' },
        { id: 17, category: 'jordan_law', article: 'Article 11.A', question: 'Have you appointed a Data Protection Officer (DPO) if your primary activity is data processing, or you handle sensitive data, financial data, or transfer data internationally?' },
        { id: 18, category: 'jordan_law', article: 'Article 11.B', question: 'Is your DPO responsible for and actively conducting periodic security assessments, staff training, and acting as the official contact for data protection authorities?' },
        { id: 19, category: 'jordan_law', article: 'Article 12', question: 'If you act as a "Processor" for another company, do your contracts and procedures ensure you only process data according to instructions, for the specified purpose/duration, and erase/return it afterward?' },
        { id: 20, category: 'jordan_law', article: 'Article 13', question: 'Are all employees who handle personal data trained to understand its confidential nature and bound by confidentiality obligations?' },
        { id: 21, category: 'jordan_law', article: 'Article 14.B', question: 'Do you maintain detailed records that document what data has been transferred, who the recipient is, the purpose of the transfer, and the data subject\'s consent for it?' },
        { id: 22, category: 'jordan_law', article: 'Article 15.B', question: 'Before transferring any personal data outside of Jordan, do you perform and document a verification to ensure the recipient provides an adequate level of data protection?' },
        { id: 23, category: 'jordan_law', article: 'Article 20.A', question: 'Do you have a documented incident response plan to notify affected individuals within 24 hours and the official Unit within 72 hours of discovering a serious data breach?' },
        { id: 24, category: 'jordan_law', article: 'Article 23', question: 'Have you developed a formal plan and roadmap to bring all your data processing activities into full compliance with this law within one year of its effective date?' },

        // ISO 27001 Comprehensive Checklist
        { id: 25, category: 'iso_27001', article: '5.1.1', question: 'Do you have security policies for information security that are approved by management with evidence of compliance?' },
        { id: 26, category: 'iso_27001', article: '6.1.1', question: 'Are security roles and responsibilities clearly defined?' },
        { id: 27, category: 'iso_27001', article: '6.1.2', question: 'Is segregation of duties properly defined?' },
        { id: 28, category: 'iso_27001', article: '6.1.3', question: 'Have you contacted verification body/authority for compliance verification?' },
        { id: 29, category: 'iso_27001', article: '6.1.4', question: 'Have you established contact with special interest groups regarding compliance?' },
        { id: 30, category: 'iso_27001', article: '6.1.5', question: 'Is there evidence of information security in project management?' },
        { id: 31, category: 'iso_27001', article: '6.2.1', question: 'Do you have a defined policy for mobile devices?' },
        { id: 32, category: 'iso_27001', article: '6.2.2', question: 'Do you have a defined policy for working remotely (teleworking)?' },
        { id: 33, category: 'iso_27001', article: '7.1.1', question: 'Do you have a defined policy for screening employees prior to employment?' },
        { id: 34, category: 'iso_27001', article: '7.1.2', question: 'Do you have a defined policy for HR terms and conditions of employment?' },
        { id: 35, category: 'iso_27001', article: '7.2.1', question: 'Do you have a defined policy for management responsibilities?' },
        { id: 36, category: 'iso_27001', article: '7.2.2', question: 'Do you have a defined policy for information security awareness, education, and training?' },
        { id: 37, category: 'iso_27001', article: '7.2.3', question: 'Do you have a defined disciplinary process regarding information security?' },
        { id: 38, category: 'iso_27001', article: '7.3.1', question: 'Do you have a defined policy for HR termination or change-of-employment regarding information security?' },
        { id: 39, category: 'iso_27001', article: '8.1.1', question: 'Do you maintain a complete inventory list of assets?' },
        { id: 40, category: 'iso_27001', article: '8.1.2', question: 'Do you have a complete ownership list of assets?' },
        { id: 41, category: 'iso_27001', article: '8.1.3', question: 'Do you have a defined "acceptable use" of assets policy?' },
        { id: 42, category: 'iso_27001', article: '8.1.4', question: 'Do you have a defined return of assets policy?' },
        { id: 43, category: 'iso_27001', article: '8.2.1', question: 'Do you have a defined policy for classification of information?' },
        { id: 44, category: 'iso_27001', article: '8.2.2', question: 'Do you have a defined policy for labeling information?' },
        { id: 45, category: 'iso_27001', article: '8.2.3', question: 'Do you have a defined policy for handling of assets?' },
        { id: 46, category: 'iso_27001', article: '8.3.1', question: 'Do you have a defined policy for management of removable media?' },
        { id: 47, category: 'iso_27001', article: '8.3.2', question: 'Do you have a defined policy for disposal of media?' },
        { id: 48, category: 'iso_27001', article: '8.3.3', question: 'Do you have a defined policy for physical media transfer?' },
        { id: 49, category: 'iso_27001', article: '9.1.1', question: 'Do you have a defined access control policy?' },
        { id: 50, category: 'iso_27001', article: '9.1.2', question: 'Do you have a defined policy for access to networks and network services?' },
        { id: 51, category: 'iso_27001', article: '9.2.1', question: 'Do you have a defined policy for user asset registration and de-registration?' },
        { id: 52, category: 'iso_27001', article: '9.2.2', question: 'Do you have a defined policy for user access provisioning?' },
        { id: 53, category: 'iso_27001', article: '9.2.3', question: 'Do you have a defined policy for management of privileged access rights?' },
        { id: 54, category: 'iso_27001', article: '9.2.4', question: 'Do you have a defined policy for management of secret authentication information of users?' },
        { id: 55, category: 'iso_27001', article: '9.2.5', question: 'Do you have a defined policy for review of user access rights?' },
        { id: 56, category: 'iso_27001', article: '9.2.6', question: 'Do you have a defined policy for removal or adjustment of access rights?' },
        { id: 57, category: 'iso_27001', article: '9.3.1', question: 'Do you have a defined policy for use of secret authentication information?' },
        { id: 58, category: 'iso_27001', article: '9.4.1', question: 'Do you have a defined policy for information access restrictions?' },
        { id: 59, category: 'iso_27001', article: '9.4.2', question: 'Do you have a defined policy for secure log-in procedures?' },
        { id: 60, category: 'iso_27001', article: '9.4.3', question: 'Do you have a defined policy for password management systems?' },
        { id: 61, category: 'iso_27001', article: '9.4.4', question: 'Do you have a defined policy for use of privileged utility programs?' },
        { id: 62, category: 'iso_27001', article: '9.4.5', question: 'Do you have a defined policy for access control to program source code?' },
        { id: 63, category: 'iso_27001', article: '10.1.1', question: 'Do you have a defined policy for use of cryptographic controls?' },
        { id: 64, category: 'iso_27001', article: '10.1.2', question: 'Do you have a defined policy for key management?' },
        { id: 65, category: 'iso_27001', article: '11.1.1', question: 'Do you have a defined policy for physical security perimeter?' },
        { id: 66, category: 'iso_27001', article: '11.1.2', question: 'Do you have a defined policy for physical entry controls?' },
        { id: 67, category: 'iso_27001', article: '11.1.3', question: 'Do you have a defined policy for securing offices, rooms and facilities?' },
        { id: 68, category: 'iso_27001', article: '11.1.4', question: 'Do you have a defined policy for protection against external and environmental threats?' },
        { id: 69, category: 'iso_27001', article: '11.1.5', question: 'Do you have a defined policy for working in secure areas?' },
        { id: 70, category: 'iso_27001', article: '11.1.6', question: 'Do you have a defined policy for delivery and loading areas?' },
        { id: 71, category: 'iso_27001', article: '11.2.1', question: 'Do you have a defined policy for equipment siting and protection?' },
        { id: 72, category: 'iso_27001', article: '11.2.2', question: 'Do you have a defined policy for supporting utilities?' },
        { id: 73, category: 'iso_27001', article: '11.2.3', question: 'Do you have a defined policy for cabling security?' },
        { id: 74, category: 'iso_27001', article: '11.2.4', question: 'Do you have a defined policy for equipment maintenance?' },
        { id: 75, category: 'iso_27001', article: '11.2.5', question: 'Do you have a defined policy for removal of assets?' },
        { id: 76, category: 'iso_27001', article: '11.2.6', question: 'Do you have a defined policy for security of equipment and assets off-premises?' },
        { id: 77, category: 'iso_27001', article: '11.2.7', question: 'Do you have secure disposal or re-use of equipment procedures?' },
        { id: 78, category: 'iso_27001', article: '11.2.8', question: 'Do you have a defined policy for unattended user equipment?' },
        { id: 79, category: 'iso_27001', article: '11.2.9', question: 'Do you have a defined clear desk and clear screen policy?' },
        { id: 80, category: 'iso_27001', article: '12.1.1', question: 'Do you have a defined policy for documented operating procedures?' },
        { id: 81, category: 'iso_27001', article: '12.1.2', question: 'Do you have a defined policy for change management?' },
        { id: 82, category: 'iso_27001', article: '12.1.3', question: 'Do you have a defined policy for capacity management?' },
        { id: 83, category: 'iso_27001', article: '12.1.4', question: 'Do you have a defined policy for separation of development, testing and operational environments?' },
        { id: 84, category: 'iso_27001', article: '12.2.1', question: 'Do you have a defined policy for controls against malware?' },
        { id: 85, category: 'iso_27001', article: '12.3.1', question: 'Do you have a defined policy for backing up systems?' },
        { id: 86, category: 'iso_27001', article: '12.3.2', question: 'Do you have a defined policy for information backup?' },
        { id: 87, category: 'iso_27001', article: '12.4.1', question: 'Do you have a defined policy for event logging?' },
        { id: 88, category: 'iso_27001', article: '12.4.2', question: 'Do you have a defined policy for protection of log information?' },
        { id: 89, category: 'iso_27001', article: '12.4.3', question: 'Do you have a defined policy for administrator and operator log?' },
        { id: 90, category: 'iso_27001', article: '12.4.4', question: 'Do you have a defined policy for clock synchronization?' },
        { id: 91, category: 'iso_27001', article: '12.5.1', question: 'Do you have a defined policy for installation of software on operational systems?' },
        { id: 92, category: 'iso_27001', article: '12.6.1', question: 'Do you have a defined policy for management of technical vulnerabilities?' },
        { id: 93, category: 'iso_27001', article: '12.6.2', question: 'Do you have a defined policy for restriction on software installation?' },
        { id: 94, category: 'iso_27001', article: '12.7.1', question: 'Do you have a defined policy for information system audit control?' },
        { id: 95, category: 'iso_27001', article: '13.1.1', question: 'Do you have a defined policy for network controls?' },
        { id: 96, category: 'iso_27001', article: '13.1.2', question: 'Do you have a defined policy for security of network services?' },
        { id: 97, category: 'iso_27001', article: '13.1.3', question: 'Do you have a defined policy for segregation in networks?' },
        { id: 98, category: 'iso_27001', article: '13.2.1', question: 'Do you have a defined policy for information transfer policies and procedures?' },
        { id: 99, category: 'iso_27001', article: '13.2.2', question: 'Do you have a defined policy for agreements on information transfer?' },
        { id: 100, category: 'iso_27001', article: '13.2.3', question: 'Do you have a defined policy for electronic messaging?' },
        { id: 101, category: 'iso_27001', article: '13.2.4', question: 'Do you have a defined policy for confidentiality or non-disclosure agreements?' },
        { id: 102, category: 'iso_27001', article: '13.2.5', question: 'Do you have a defined policy for system acquisition, development and maintenance?' },
        { id: 103, category: 'iso_27001', article: '14.1.1', question: 'Do you have a defined policy for information security requirements analysis and specification?' },
        { id: 104, category: 'iso_27001', article: '14.1.2', question: 'Do you have a defined policy for securing application services on public networks?' },
        { id: 105, category: 'iso_27001', article: '14.1.3', question: 'Do you have a defined policy for protecting application service transactions?' },
        { id: 106, category: 'iso_27001', article: '14.2.1', question: 'Do you have a defined policy for in-house development?' },
        { id: 107, category: 'iso_27001', article: '15.1.1', question: 'Do you have a defined policy for supplier relationships?' },
        { id: 108, category: 'iso_27001', article: '16.1.1', question: 'Do you have a defined policy for information security management?' },
        { id: 109, category: 'iso_27001', article: '17.1.1', question: 'Do you have a defined policy for information security continuity?' },
        { id: 110, category: 'iso_27001', article: '17.2.1', question: 'Do you have a defined policy for redundancies?' },
        { id: 111, category: 'iso_27001', article: '18.1.1', question: 'Do you have a defined policy for identification of applicable legislation and contractual requirement?' },
        { id: 112, category: 'iso_27001', article: '18.1.2', question: 'Do you have a defined policy for intellectual property rights?' },
        { id: 113, category: 'iso_27001', article: '18.1.3', question: 'Do you have a defined policy for protection of records?' },
        { id: 114, category: 'iso_27001', article: '18.1.4', question: 'Do you have a defined policy for privacy and protection of personally identifiable information?' },
        { id: 115, category: 'iso_27001', article: '18.1.5', question: 'Do you have a defined policy for regulation of cryptographic control?' },
        { id: 116, category: 'iso_27001', article: '18.2.1', question: 'Do you have a defined policy for compliance with security policies and standards?' },
        { id: 117, category: 'iso_27001', article: '18.2.2', question: 'Do you have a defined policy for technical compliance review?' }
    ];

    let userAnswers = {};
    let currentCategory = 'jordan_law';
    let companyLogo = null;
    let signature = null;

    const questionnaireContainer = document.getElementById('questionnaire');
    const scoreCircle = document.getElementById('score-circle');
    const scoreText = document.getElementById('score-text');
    const exportBtn = document.getElementById('export-btn');
    const exportPdfBtn = document.getElementById('export-pdf');
    const exportExcelBtn = document.getElementById('export-excel');
    const checklistSelect = document.getElementById('checklist-select');
    const companyLogoInput = document.getElementById('company-logo');
    const signatureInput = document.getElementById('signature');
    
    const floatingScoreBtn = document.getElementById('floating-score-btn');
    const floatingScoreText = document.getElementById('floating-score-text');
    const floatingScorePopup = document.getElementById('floating-score-popup');
    const popupClose = document.getElementById('popup-close');
    const popupScoreCircle = document.getElementById('popup-score-circle');
    const popupScoreText = document.getElementById('popup-score-text');
    const popupAnsweredCount = document.getElementById('popup-answered-count');
    const popupTotalCount = document.getElementById('popup-total-count');
    
    function renderQuestions() {
        questionnaireContainer.innerHTML = '';
        const filteredQuestions = questions.filter(q => q.category === currentCategory);

        filteredQuestions.forEach(q => {
            const card = document.createElement('div');
            card.className = 'question-card';
            const currentAnswer = userAnswers[q.id];
            const currentNote = currentAnswer?.note || '';
            
            card.innerHTML = `
                <div class="article-title">${q.article}</div>
                <p>${q.question}</p>
                <div class="button-group">
                    <button class="yes-btn ${currentAnswer?.answer === 'yes' ? 'answered' : ''}" 
                            data-id="${q.id}" data-answer="yes" 
                            ${currentAnswer?.answer ? 'disabled' : ''}>Yes</button>
                    <button class="no-btn ${currentAnswer?.answer === 'no' ? 'answered' : ''}" 
                            data-id="${q.id}" data-answer="no" 
                            ${currentAnswer?.answer ? 'disabled' : ''}>No</button>
                </div>
                <div class="note-section">
                    <label for="note-${q.id}">Notes (optional):</label>
                    <textarea id="note-${q.id}" class="note-input" placeholder="Add any additional notes or comments..."
                              data-id="${q.id}">${currentNote}</textarea>
                </div>
            `;
            questionnaireContainer.appendChild(card);
        });
    }

    function updateScore() {
        const filteredQuestions = questions.filter(q => q.category === currentCategory);
        const answeredQuestions = Object.values(userAnswers).filter(ans => ans.category === currentCategory);
        
        const answeredCount = document.getElementById('answered-count');
        const totalCount = document.getElementById('total-count');
        answeredCount.textContent = answeredQuestions.length;
        totalCount.textContent = filteredQuestions.length;
        
        popupAnsweredCount.textContent = answeredQuestions.length;
        popupTotalCount.textContent = filteredQuestions.length;
        
        if (answeredQuestions.length === 0) {
            scoreText.textContent = '100%';
            floatingScoreText.textContent = '100%';
            popupScoreText.textContent = '100%';
            const fullCircleGradient = `conic-gradient(var(--success-color) 360deg, var(--danger-color) 0deg)`;
            scoreCircle.style.background = fullCircleGradient;
            popupScoreCircle.style.background = fullCircleGradient;
            return;
        }

        const yesAnswers = answeredQuestions.filter(ans => ans.answer === 'yes').length;
        const score = Math.round((yesAnswers / answeredQuestions.length) * 100);
        
        scoreText.textContent = `${score}%`;
        floatingScoreText.textContent = `${score}%`;
        popupScoreText.textContent = `${score}%`;
        const degree = (score / 100) * 360;
        
        const circleGradient = `conic-gradient(var(--success-color) ${degree}deg, var(--danger-color) ${degree}deg)`;
        scoreCircle.style.background = circleGradient;
        popupScoreCircle.style.background = circleGradient;
        
        floatingScoreBtn.classList.add('pulse');
        setTimeout(() => {
            floatingScoreBtn.classList.remove('pulse');
        }, 2000);
    }
    
    function handleAnswerClick(e) {
        const target = e.target;
        if (!target.matches('.yes-btn, .no-btn')) return;

        const id = parseInt(target.dataset.id, 10);
        const answer = target.dataset.answer;
        
        const existingNote = userAnswers[id]?.note || '';
        
        userAnswers[id] = { answer, category: currentCategory, note: existingNote };
        
        const buttonGroup = target.parentElement;
        Array.from(buttonGroup.children).forEach(btn => {
            btn.disabled = true;
            btn.classList.remove('answered');
        });
        target.classList.add('answered');
        
        updateScore();
    }

    function handleNoteChange(e) {
        const target = e.target;
        if (!target.matches('.note-input')) return;

        const id = parseInt(target.dataset.id, 10);
        const note = target.value;
        
        if (!userAnswers[id]) {
            userAnswers[id] = { answer: null, category: currentCategory, note: '' };
        }
        
        userAnswers[id].note = note;
    }

    function handleImageUpload(file, callback) {
        if (!file) {
            callback(null);
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                const maxWidth = 200;
                const maxHeight = 100;
                let { width, height } = img;
                
                if (width > height) {
                    if (width > maxWidth) {
                        height = (height * maxWidth) / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = (width * maxHeight) / height;
                        height = maxHeight;
                    }
                }
                
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);
                
                callback({
                    data: canvas.toDataURL('image/png'),
                    width: width,
                    height: height
                });
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    function handleLogoUpload(e) {
        const file = e.target.files[0];
        handleImageUpload(file, (imageData) => {
            companyLogo = imageData;
        });
    }

    function handleSignatureUpload(e) {
        const file = e.target.files[0];
        handleImageUpload(file, (imageData) => {
            signature = imageData;
        });
    }

    function exportToPDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        const answeredQuestions = questions.filter(q => userAnswers[q.id]?.category === currentCategory);
        const yesAnswers = answeredQuestions.filter(q => userAnswers[q.id].answer === 'yes');
        const noAnswers = answeredQuestions.filter(q => userAnswers[q.id].answer === 'no');
        const score = answeredQuestions.length > 0 ? Math.round((yesAnswers.length / answeredQuestions.length) * 100) : 100;
        
        let yPos = 20;
        if (companyLogo) {
            const maxLogoWidth = 50;
            const maxLogoHeight = 30;
            let logoWidth = companyLogo.width;
            let logoHeight = companyLogo.height;
            if (logoWidth > maxLogoWidth) {
                logoHeight = logoHeight * (maxLogoWidth / logoWidth);
                logoWidth = maxLogoWidth;
            }
            if (logoHeight > maxLogoHeight) {
                logoWidth = logoWidth * (maxLogoHeight / logoHeight);
                logoHeight = maxLogoHeight;
            }
            const logoX = (210 - logoWidth) / 2;
            doc.addImage(companyLogo.data, 'PNG', logoX, yPos, logoWidth, logoHeight);
            yPos += logoHeight + 8;
        }
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        doc.text('Compliance Self-Assessment Report', 105, yPos, { align: 'center' });
        yPos += 10;
        doc.setFontSize(14);
        doc.setFont('helvetica', 'normal');
        doc.text(`Checklist: ${checklistSelect.options[checklistSelect.selectedIndex].text}`, 105, yPos, { align: 'center' });
        yPos += 8;
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 105, yPos, { align: 'center' });
        yPos += 15;
        
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.text(`Final Score: ${score}%`, 105, yPos, { align: 'center' });
        yPos += 5;
        doc.setLineWidth(0.5);
        doc.line(20, yPos, 190, yPos);
        yPos += 15;

        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor('#28a745');
        doc.text('Compliant Areas (Answered "Yes")', 20, yPos);
        yPos += 10;

        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(40);
        if (yesAnswers.length > 0) {
            yesAnswers.forEach(q => {
                const answer = userAnswers[q.id];
                doc.text(`• [${q.article}] ${q.question}`, 25, yPos, { maxWidth: 160 });
                yPos += 12;
                
                if (answer.note && answer.note.trim()) {
                    doc.setFont('helvetica', 'italic');
                    doc.setTextColor(80);
                    doc.text(`  Note: ${answer.note}`, 30, yPos, { maxWidth: 155 });
                    yPos += 8;
                    doc.setFont('helvetica', 'normal');
                    doc.setTextColor(40);
                }
                
                if (yPos > 270) { doc.addPage(); yPos = 20; }
            });
        } else {
            doc.text('No items answered "Yes".', 25, yPos);
            yPos += 12;
        }

        yPos += 10;
        if (yPos > 260) { doc.addPage(); yPos = 20; }
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor('#dc3545');
        doc.text('Areas for Improvement (Answered "No")', 20, yPos);
        yPos += 10;

        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(40);
        if (noAnswers.length > 0) {
            noAnswers.forEach(q => {
                const answer = userAnswers[q.id];
                doc.text(`• [${q.article}] ${q.question}`, 25, yPos, { maxWidth: 160 });
                yPos += 12;
                
                if (answer.note && answer.note.trim()) {
                    doc.setFont('helvetica', 'italic');
                    doc.setTextColor(80);
                    doc.text(`  Note: ${answer.note}`, 30, yPos, { maxWidth: 155 });
                    yPos += 8;
                    doc.setFont('helvetica', 'normal');
                    doc.setTextColor(40);
                }
                
                if (yPos > 250) { doc.addPage(); yPos = 20; }
            });
        } else {
            doc.text('No items answered "No".', 25, yPos);
            yPos += 12;
        }

        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            if (i === pageCount && signature) {
                const maxSigWidth = 40;
                const maxSigHeight = 20;
                let sigWidth = signature.width;
                let sigHeight = signature.height;
                if (sigWidth > maxSigWidth) {
                    sigHeight = sigHeight * (maxSigWidth / sigWidth);
                    sigWidth = maxSigWidth;
                }
                if (sigHeight > maxSigHeight) {
                    sigWidth = sigWidth * (maxSigHeight / sigHeight);
                    sigHeight = maxSigHeight;
                }
                const sigX = 210 - sigWidth - 20;
                const sigY = 265 - sigHeight;
                doc.setFontSize(10);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(40);
                doc.text('Signature:', sigX, sigY - 6);
                doc.addImage(signature.data, 'PNG', sigX, sigY, sigWidth, sigHeight);
            }
            
            doc.setFontSize(8);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(100);
            
            doc.text('All data processed locally. Tool available at: https://github.com/qusaismael/GRC-check', 105, 285, { align: 'center' });
            doc.text('Made with accuracy by @qusaismael - https://qusai.pro', 105, 290, { align: 'center' });
            doc.text(`Page ${i} of ${pageCount}`, 105, 295, { align: 'center' });
        }

        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        doc.save(`Compliance-Report-${currentCategory.replace('_', '-')}-${timestamp}.pdf`);
    }

    function exportToExcel() {
        const answeredQuestions = questions.filter(q => userAnswers[q.id]?.category === currentCategory);
        const yesAnswers = answeredQuestions.filter(q => userAnswers[q.id].answer === 'yes');
        const noAnswers = answeredQuestions.filter(q => userAnswers[q.id].answer === 'no');
        const score = answeredQuestions.length > 0 ? Math.round((yesAnswers.length / answeredQuestions.length) * 100) : 100;
        
        // Create workbook
        const wb = XLSX.utils.book_new();
        
        // Main Report Sheet - Comprehensive Overview
        const reportData = [
            ['GRC COMPLIANCE ASSESSMENT REPORT'],
            [''],
            ['Assessment Details:'],
            ['Framework:', checklistSelect.options[checklistSelect.selectedIndex].text],
            ['Assessment Date:', new Date().toLocaleDateString()],
            ['Assessment Time:', new Date().toLocaleTimeString()],
            [''],
            ['COMPLIANCE SCORE:', `${score}%`],
            [''],
            ['SUMMARY:'],
            ['Total Questions:', questions.filter(q => q.category === currentCategory).length],
            ['Questions Answered:', answeredQuestions.length],
            ['Compliant (YES):', yesAnswers.length],
            ['Non-Compliant (NO):', noAnswers.length],
            ['Pending Review:', questions.filter(q => q.category === currentCategory).length - answeredQuestions.length],
            [''],
            ['DETAILED ASSESSMENT RESULTS:'],
            [''],
            ['Article', 'Question', 'Answer', 'Notes', 'Compliance Status']
        ];
        
        // Add all questions from the current category
        const allCategoryQuestions = questions.filter(q => q.category === currentCategory);
        allCategoryQuestions.forEach(q => {
            const answer = userAnswers[q.id];
            let answerText = 'NOT ANSWERED';
            let notes = 'No response provided';
            let status = 'PENDING REVIEW';
            
            if (answer) {
                answerText = answer.answer.toUpperCase();
                notes = answer.note && answer.note.trim() ? answer.note : 'No additional notes provided';
                status = answer.answer === 'yes' ? 'COMPLIANT' : 'NON-COMPLIANT';
            }
            
            reportData.push([
                q.article,
                q.question.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ''), // Remove HTML tags and entities
                answerText,
                notes,
                status
            ]);
        });
        
        // Add summary footer
        reportData.push(['']);
        reportData.push(['REPORT SUMMARY:']);
        reportData.push(['Compliance Rate:', `${score}%`]);
        reportData.push(['Assessment Completion Rate:', `${Math.round((answeredQuestions.length / allCategoryQuestions.length) * 100)}%`]);
        reportData.push(['']);
        reportData.push(['PRIVACY NOTICE:']);
        reportData.push(['All data processed locally on your device']);
        reportData.push(['No information sent to external servers']);
        reportData.push(['Tool source: https://github.com/qusaismael/GRC-check']);
        reportData.push(['Created by: @qusaismael - https://qusai.pro']);
        
        const reportWs = XLSX.utils.aoa_to_sheet(reportData);
        
        // Enhanced formatting for main report
        reportWs['!merges'] = [
            { s: { r: 0, c: 0 }, e: { r: 0, c: 4 } }, // Title
            { s: { r: 2, c: 0 }, e: { r: 2, c: 1 } }, // Assessment Details
            { s: { r: 7, c: 0 }, e: { r: 7, c: 1 } }, // Compliance Score
            { s: { r: 9, c: 0 }, e: { r: 9, c: 1 } }, // Summary
            { s: { r: 16, c: 0 }, e: { r: 16, c: 4 } } // Detailed Results
        ];
        
        // Set optimal column widths
        reportWs['!cols'] = [
            { width: 18 }, // Article
            { width: 85 }, // Question (wider for full text)
            { width: 15 }, // Answer
            { width: 50 }, // Notes (wider for full notes)
            { width: 20 }  // Status
        ];
        
        // Add auto-filter to the data
        reportWs['!autofilter'] = { ref: `A19:E${19 + allCategoryQuestions.length - 1}` };
        
        XLSX.utils.book_append_sheet(wb, reportWs, 'Complete Assessment');
        
        // Compliant Areas Sheet (Only YES answers with full details)
        if (yesAnswers.length > 0) {
            const compliantData = [
                ['COMPLIANT AREAS - DETAILED REPORT'],
                ['Areas where your organization meets compliance requirements'],
                [''],
                ['Article', 'Compliance Requirement', 'Implementation Notes', 'Verification Status']
            ];
            
            yesAnswers.forEach((q, index) => {
                const answer = userAnswers[q.id];
                compliantData.push([
                    q.article,
                    q.question.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ''),
                    answer.note && answer.note.trim() ? answer.note : 'Requirement met - no additional notes',
                    'VERIFIED COMPLIANT'
                ]);
            });
            
            compliantData.push(['']);
            compliantData.push(['COMPLIANT AREAS SUMMARY:']);
            compliantData.push(['Total Compliant Areas:', yesAnswers.length]);
            compliantData.push(['Compliance Achievement:', `${Math.round((yesAnswers.length / allCategoryQuestions.length) * 100)}%`]);
            compliantData.push(['']);
            compliantData.push(['RECOMMENDATIONS:']);
            compliantData.push(['✓ Maintain current compliance standards']);
            compliantData.push(['✓ Document best practices for future reference']);
            compliantData.push(['✓ Regular monitoring to ensure continued compliance']);
            compliantData.push(['✓ Share successful implementations across organization']);
            
            const compliantWs = XLSX.utils.aoa_to_sheet(compliantData);
            
            compliantWs['!merges'] = [
                { s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }, // Title
                { s: { r: 1, c: 0 }, e: { r: 1, c: 3 } }  // Subtitle
            ];
            
            compliantWs['!cols'] = [
                { width: 18 }, // Article
                { width: 75 }, // Question
                { width: 45 }, // Notes
                { width: 20 }  // Status
            ];
            
            XLSX.utils.book_append_sheet(wb, compliantWs, 'Compliant Areas');
        }
        
        // Non-Compliant Areas Sheet (Only NO answers with action plans)
        if (noAnswers.length > 0) {
            const nonCompliantData = [
                ['AREAS REQUIRING IMMEDIATE ATTENTION'],
                ['Critical compliance gaps that need to be addressed'],
                [''],
                ['Article', 'Compliance Requirement', 'Current Gap Analysis', 'Priority Level', 'Recommended Action']
            ];
            
            noAnswers.forEach((q, index) => {
                const answer = userAnswers[q.id];
                const priority = index < Math.ceil(noAnswers.length / 3) ? 'HIGH' : 
                               index < Math.ceil(noAnswers.length * 2/3) ? 'MEDIUM' : 'STANDARD';
                
                nonCompliantData.push([
                    q.article,
                    q.question.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ''),
                    answer.note && answer.note.trim() ? answer.note : 'Compliance gap identified - requires implementation',
                    priority,
                    'Immediate implementation required'
                ]);
            });
            
            nonCompliantData.push(['']);
            nonCompliantData.push(['NON-COMPLIANCE SUMMARY:']);
            nonCompliantData.push(['Total Areas Requiring Action:', noAnswers.length]);
            nonCompliantData.push(['Risk Level:', noAnswers.length > allCategoryQuestions.length * 0.5 ? 'HIGH' : 'MODERATE']);
            nonCompliantData.push(['']);
            nonCompliantData.push(['ACTION PLAN RECOMMENDATIONS:']);
            nonCompliantData.push(['1. Prioritize HIGH priority items for immediate action']);
            nonCompliantData.push(['2. Develop implementation timeline for each requirement']);
            nonCompliantData.push(['3. Assign responsible team members for each area']);
            nonCompliantData.push(['4. Establish regular review and monitoring processes']);
            nonCompliantData.push(['5. Schedule follow-up assessments to track progress']);
            nonCompliantData.push(['6. Document all remediation efforts for audit trails']);
            
            const nonCompliantWs = XLSX.utils.aoa_to_sheet(nonCompliantData);
            
            nonCompliantWs['!merges'] = [
                { s: { r: 0, c: 0 }, e: { r: 0, c: 4 } }, // Title
                { s: { r: 1, c: 0 }, e: { r: 1, c: 4 } }  // Subtitle
            ];
            
            nonCompliantWs['!cols'] = [
                { width: 18 }, // Article
                { width: 65 }, // Question
                { width: 40 }, // Notes
                { width: 15 }, // Priority
                { width: 25 }  // Action
            ];
            
            XLSX.utils.book_append_sheet(wb, nonCompliantWs, 'Action Required');
        }
        
        // Executive Summary Sheet
        const execData = [
            ['EXECUTIVE SUMMARY'],
            ['GRC Compliance Assessment Report'],
            [''],
            ['KEY METRICS:'],
            ['Overall Compliance Score:', `${score}%`],
            ['Assessment Completion Rate:', `${Math.round((answeredQuestions.length / allCategoryQuestions.length) * 100)}%`],
            ['Framework Assessed:', checklistSelect.options[checklistSelect.selectedIndex].text],
            ['Assessment Date:', new Date().toLocaleDateString()],
            [''],
            ['COMPLIANCE BREAKDOWN:'],
            ['Fully Compliant Areas:', yesAnswers.length],
            ['Areas Requiring Action:', noAnswers.length],
            ['Pending Assessment:', allCategoryQuestions.length - answeredQuestions.length],
            [''],
            ['RISK ASSESSMENT:'],
            ['Overall Risk Level:', score >= 80 ? 'LOW' : score >= 60 ? 'MODERATE' : 'HIGH'],
            ['Immediate Action Required:', noAnswers.length > 0 ? 'YES' : 'NO'],
            [''],
            ['NEXT STEPS:'],
            ['1. Review all non-compliant areas immediately'],
            ['2. Develop comprehensive remediation plan'],
            ['3. Assign ownership for each compliance gap'],
            ['4. Set target dates for full compliance'],
            ['5. Schedule regular compliance monitoring'],
            [''],
            ['REPORT DETAILS:'],
            ['Generated:', new Date().toLocaleString()],
            ['Data Privacy:', 'All processing done locally'],
            ['Tool Source:', 'https://github.com/qusaismael/GRC-check'],
            ['Support:', '@qusaismael - https://qusai.pro']
        ];
        
        const execWs = XLSX.utils.aoa_to_sheet(execData);
        
        execWs['!merges'] = [
            { s: { r: 0, c: 0 }, e: { r: 0, c: 1 } }, // Title
            { s: { r: 1, c: 0 }, e: { r: 1, c: 1 } }  // Subtitle
        ];
        
        execWs['!cols'] = [
            { width: 30 },
            { width: 40 }
        ];
        
        XLSX.utils.book_append_sheet(wb, execWs, 'Executive Summary');
        
        // Export with timestamp
        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        XLSX.writeFile(wb, `GRC-Compliance-Assessment-${currentCategory.replace('_', '-')}-${timestamp}.xlsx`);
    }

    function handleCategoryChange(e) {
        currentCategory = e.target.value;
        userAnswers = {};
        renderQuestions();
        updateScore();
    }
    
    function toggleFloatingPopup() {
        floatingScorePopup.classList.toggle('show');
    }
    
    function closeFloatingPopup() {
        floatingScorePopup.classList.remove('show');
    }
    
    function handleOutsideClick(e) {
        if (!floatingScorePopup.contains(e.target) && !floatingScoreBtn.contains(e.target)) {
            closeFloatingPopup();
        }
    }
    
    questionnaireContainer.addEventListener('click', handleAnswerClick);
    questionnaireContainer.addEventListener('input', handleNoteChange);
    exportBtn.addEventListener('click', exportToPDF);
    exportPdfBtn.addEventListener('click', exportToPDF);
    exportExcelBtn.addEventListener('click', exportToExcel);
    checklistSelect.addEventListener('change', handleCategoryChange);
    companyLogoInput.addEventListener('change', handleLogoUpload);
    signatureInput.addEventListener('change', handleSignatureUpload);
    
    floatingScoreBtn.addEventListener('click', toggleFloatingPopup);
    popupClose.addEventListener('click', closeFloatingPopup);
    document.addEventListener('click', handleOutsideClick);
    
    renderQuestions();
    updateScore();
});