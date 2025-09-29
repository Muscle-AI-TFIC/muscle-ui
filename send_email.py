import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

EMAIL_USER = os.environ.get("EMAIL_USER")
EMAIL_PASS = os.environ.get("EMAIL_PASS")
EMAIL_DEST = os.environ.get("EMAIL_DEST")
EMAIL_SUBJECT = os.environ.get("EMAIL_SUBJECT", "Build Complete")
EMAIL_CONTENT = os.environ.get("EMAIL_CONTENT", "Seu job terminou com sucesso.")

msg = MIMEMultipart()
msg['From'] = EMAIL_USER
msg['To'] = EMAIL_DEST
msg['Subject'] = EMAIL_SUBJECT
msg.attach(MIMEText(EMAIL_CONTENT, 'plain'))

try:
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
        server.login(EMAIL_USER, EMAIL_PASS)
        server.sendmail(EMAIL_USER, EMAIL_DEST, msg.as_string())
    print("E-mail enviado com sucesso!")
except Exception as e:
    print("Erro ao enviar e-mail:", e)
    exit(1)
