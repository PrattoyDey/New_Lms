from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group
from accounts.models import CustomPermission, GroupPermissionMapping


class Command(BaseCommand):
    help = "Seed default groups and custom permissions"

    def handle(self, *args, **options):
        self.stdout.write("🌱 Seeding roles and permissions...")

        # 1️⃣ Create Groups
        groups = {
            "Student": [],
            "Creator": [],
            "Admin": []
        }

        for group_name in groups.keys():
            group, created = Group.objects.get_or_create(name=group_name)
            if created:
                self.stdout.write(f"✅ Group created: {group_name}")
            else:
                self.stdout.write(f"ℹ️ Group exists: {group_name}")

        # 2️⃣ Create Custom Permissions
        permissions = [
            ("can_create_course", "Can create course"),
            ("can_update_course", "Can update course"),
            ("can_delete_course", "Can delete course"),
            ("can_enroll_course", "Can enroll course"),
            ("can_view_all_users", "Can view all users"),
        ]

        permission_objects = {}

        for code, desc in permissions:
            perm, created = CustomPermission.objects.get_or_create(
                code_name=code,
                defaults={"description": desc}
            )
            permission_objects[code] = perm

            if created:
                self.stdout.write(f"✅ Permission created: {code}")
            else:
                self.stdout.write(f"ℹ️ Permission exists: {code}")

        # 3️⃣ Map Group → Permissions
        mapping = {
            "Student": ["can_enroll_course"],
            "Creator": ["can_create_course", "can_update_course"],
            "Admin": [
                "can_create_course",
                "can_update_course",
                "can_delete_course",
                "can_enroll_course",
                "can_view_all_users",
            ],
        }

        for group_name, perms in mapping.items():
            group = Group.objects.get(name=group_name)

            for perm_code in perms:
                GroupPermissionMapping.objects.get_or_create(
                    group=group,
                    permission=permission_objects[perm_code]
                )

            self.stdout.write(f"🔗 Mapped permissions for {group_name}")

        self.stdout.write(self.style.SUCCESS("🎉 Seeding completed successfully!"))
