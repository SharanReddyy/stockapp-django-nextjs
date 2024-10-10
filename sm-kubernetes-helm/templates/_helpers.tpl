{{- define "sm-kubernetes.labels" -}}
app.kubernetes.io/name: {{ include "sm-kubernetes.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/version: {{ .Chart.AppVersion }}
{{- end -}}
