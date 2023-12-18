# SmurFinder

## Auteurs
- Quemeneur Katell
- Cordier Maxime

## Informations
SmurFinder est une application web qui a pour but d'offrir aux utilisateurs un dictionnaire de Schtroumpfs (The Smurfs en anglais). Cette application est déployée grâce au principe de contenerisation tel que Docker. Dans le cadre du module Cloud de la formation IAI de l'ENSSAT cette application doit également être déployée sur un Cloud. Dans notre cas, nous utilisons la solution open source nommée OpenStack. 

## Pré-requis
- Environnement OpenStack

## Comment faire ? 
1. Identifiez le fichier 'smurfinder_template.yaml' dans le répertoire HotTemplate.
2. Connectez-vous sur OpenStack.
3. Cliquez sur le menu 'Orchestration' puis sur 'Stack'.
4. Déployez une nouvelle stack en cliquant sur 'Launch Stack'.
5. Renseignez le 'Template source' (='File') et le "Template file" (='smurfinder_template.yaml').
6. Cliquez sur 'Next' pour lancer la stack.
7. Retenez l'adresse IP du service. Cliquez sur le menu 'Network' puis sur 'Floatings IP'. L'adresse IP (@IPSmurf) du service SmurFinder correspond à celle associée à la machine virtuelle front. 
8. Dans un moteur de recherche, renseignez l'URL suvante : https://@IPSmurf/Home