# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from frappe import _


def get_data():
    return [
        {
            "label": _("Créditos"),
            "items": [
                {
                    "type": "doctype",
                    "name": "Socio",
                    "onboard": 1,
                },
                {
                    "type": "doctype",
                    "name": "analisis_capital",
                    "onboard": 1,
                },
                {
                    "type": "doctype",
                    "name": "solicitud_credito",
                    "onboard": 1,
                }
            ]
        },
        {
            "label": _("CRM"),
            "items": [
                {
                    "type": "doctype",
                    "name": "Prospectos",
                    "onboard": 1,
                },
                {
                    "type": "doctype",
                    "name": "hoja_ruta",
                    "onboard": 1,
                }
            ]
        },

        {
            "label": _("Clasificación"),
            "items": [
                {
                    "type": "doctype",
                    "name": "Agencias",
                    "onboard": 1,
                },
                {
                    "type": "doctype",
                    "name": "Asesor",
                    "onboard": 1,
                },
                {
                    "type": "doctype",
                    "name": "clasificacion_credito",
                    "onboard": 1,
                },
                {
                    "type": "doctype",
                    "name": "tipo_credito",
                    "onboard": 1,
                },
                {
                    "type": "doctype",
                    "name": "tipos_comentarios",
                    "onboard": 1,
                }
            ]
        },
        {
            "label": _("Parámetros "),
            "items": [
                {
                    "type": "doctype",
                    "name": "Genero",
                    "onboard": 1,
                },
                {
                    "type": "doctype",
                    "name": "Nacionalidad",
                    "onboard": 1,
                },
                {
                    "type": "doctype",
                    "name": "Parentesco",
                    "onboard": 1,
                },
                {
                    "type": "doctype",
                    "name": "nivel_estudios",
                    "onboard": 1,
                },
                {
                    "type": "doctype",
                    "name": "Dpa",
                    "onboard": 1,
                }
            ]
        },
    ]
